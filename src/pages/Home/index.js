import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Header } from '../../components/Backgrounds';
import { WalletToast } from '../../components/Toast';
import { SEVERITY, MESSAGE } from '../../constants/wallet';
import { ABI } from '../../constants/contractABI';
import { daiABI } from '../../constants/daiContractABI';
import { CONTRACT_ADDRESS, DAI_TOKEN_ADDRESS, MULTI_SIG_ADDRESS } from '../../constants';
import {
  BoxStyle,
  TypographyTitleStyle,
  TypographyMintedTokensStyle,
  TypographyPriceStyle,
  TypographyInfoStyle,
  TypographyPercentStyle,
  ButtonPurchaseStyle,
  RegisterInputStyle,
} from './styleds';
import MultiProgress from 'react-multi-progress';
import { ethers, BigNumber } from 'ethers';
import { useEthereumContract, useEthereumNetworkContract } from '../../hooks/useContract';

const Home = (props) => {
  const { active, chainId, account } = props;

  const maxSupply = 60000000;
  const firstTrancheFund = 500000;
  const secondTrancheFund = 1500000;
  const firstPrice = 0.025;
  const secondPrice = 0.05;
  const thirdPrice = 0.1;

  const [toastInfo, setToastInfo] = useState({});
  const [isToast, setIsToast] = useState(false);
  const [amount, setAmount] = useState(null);
  const [isNumber, setIsNumber] = useState(true);
  const [maxDai, setMaxDai] = useState(null);
  const [maxDaiPerInvestor, setMaxDaiPerInvestor] = useState(null);
  const [totalDai, setTotalDai] = useState(null);
  const [startingTime, setStartingTime] = useState(null);
  const [loader, setLoader] = useState(false);

  const checkIsNumber = (str) => {
    let re = /^[0-9]+$/;

    const res = str.trim();
    if (re.test(res)) {
      return res;
    } else {
      return null;
    }
  };
  const handleToastClose = () => {
    setIsToast(false);
  };
  const connectedToast = () => {
    setIsToast(false);
    setIsToast(true);
    setToastInfo({ severity: SEVERITY.SUCCESS, message: MESSAGE.CONNECTED });
  };

  const notConnectedToast = () => {
    setIsToast(false);
    setIsToast(true);
    setToastInfo({ severity: SEVERITY.ERROR, message: MESSAGE.NOT_CONNECTED_WALLET });
  };

  const wrongNetworkToast = () => {
    setIsToast(false);
    setIsToast(true);
    setToastInfo({
      severity: SEVERITY.ERROR,
      message:
        process.env.REACT_APP_DEFAULT_ETHEREUM_NETWORK_CHAIN_ID === '1'
          ? MESSAGE.WRONG_NETWORK
          : MESSAGE.WRONG_NETWORK_TEST,
    });
  };
  const notSaleTimeToast = () => {
    setIsToast(false);
    setIsToast(true);
    setToastInfo({
      severity: SEVERITY.ERROR,
      message: MESSAGE.NOT_SALE_TIME,
    });
  };

  const handleChange = (event) => {
    const result = checkIsNumber(event.target.value);
    if (result) {
      setAmount(parseInt(event.target.value));
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (active) {
        if (`${chainId}` === process.env.REACT_APP_DEFAULT_ETHEREUM_NETWORK_CHAIN_ID) {
          connectedToast();
        } else {
          wrongNetworkToast();
        }
      } else {
        notConnectedToast();
      }
    }
    return () => {
      mounted = false;
    };
  }, [chainId, active]);

  const ethereumContract = useEthereumNetworkContract(CONTRACT_ADDRESS, ABI, true);
  const ethereumInjectedContract = useEthereumContract(CONTRACT_ADDRESS, ABI, true);
  const daiTokenContract = useEthereumContract(DAI_TOKEN_ADDRESS, daiABI, true);
  useEffect(() => {
    const getStatus = async () => {
      if (ethereumContract && ethereumContract.provider) {
        Promise.all([
          ethereumContract.maxDai(),
          ethereumContract.maxDaiPerInvestor(),
          ethereumContract.totalDai(),
          ethereumContract.startingTime(),
        ]).then(([maxDai, maxDaiPerInvestor, totalDai, startingTime]) => {
          setMaxDai(parseInt(ethers.utils.formatEther(maxDai)));
          setMaxDaiPerInvestor(parseInt(ethers.utils.formatEther(maxDaiPerInvestor)));
          setTotalDai(parseInt(ethers.utils.formatEther(totalDai)));
          setStartingTime(BigNumber.from(startingTime).toNumber());
          ethereumContract.removeAllListeners('Purchased');
          ethereumContract.on('Purchased', (investorAddress, amount, total, event) => {
            setTotalDai(parseInt(ethers.utils.formatEther(total)));
          });
        });
      }
    };

    getStatus();

    return () => {
      if (ethereumContract && ethereumContract.provider) {
        ethereumContract.removeAllListeners('Purchased');
      }
    };
  }, [ethereumContract]);

  const handlePurchase = async () => {
    if (active) {
      if (isNumber && amount > 0) {
        if (`${chainId}` === process.env.REACT_APP_DEFAULT_ETHEREUM_NETWORK_CHAIN_ID) {
          if (startingTime <= new Date().getTime() / 1000) {
            const balance = await daiTokenContract.balanceOf(account);
            if (parseInt(ethers.utils.formatEther(balance)) >= amount) {
              const presaleCounter = await ethereumContract.presaleCounter(account);
              if (maxDai >= parseInt(ethers.utils.formatEther(presaleCounter)) + amount) {
                const txApprove = await daiTokenContract.approve(
                  CONTRACT_ADDRESS,
                  amount + '000000000000000000'
                );
                setLoader(true);
                await txApprove.wait();
                setLoader(false);

                const txPurchase = await ethereumInjectedContract.purchase(
                  amount + '000000000000000000'
                );
                setLoader(true);
                await txPurchase.wait();
                setLoader(false);

                setIsToast(false);
                setIsToast(true);
                setToastInfo({ severity: SEVERITY.SUCCESS, message: MESSAGE.PURCHASE_SUCCESS });
              } else {
                setIsToast(false);
                setIsToast(true);
                setToastInfo({ severity: SEVERITY.ERROR, message: MESSAGE.EXCEED_PRESALE_MAX });
              }
            } else {
              setIsToast(false);
              setIsToast(true);
              setToastInfo({ severity: SEVERITY.ERROR, message: MESSAGE.INSUFFICIENT_FUND });
            }
          } else {
            notSaleTimeToast();
          }
        } else {
          wrongNetworkToast();
        }
      } else {
        setIsToast(false);
        setIsToast(true);
        setToastInfo({ severity: SEVERITY.ERROR, message: MESSAGE.NOT_INTEGER });
      }
    } else {
      notConnectedToast();
    }

    return null;
  };

  if (maxDai === null || totalDai === null || maxDaiPerInvestor === null || startingTime === null) {
    return (
      <>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Header />
      </>
    );
  }

  return (
    <BoxStyle>
      <Container>
        <WalletToast info={toastInfo} isToast={isToast} handleClose={handleToastClose} />
        <Header />
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <TypographyTitleStyle gutterBottom>
            A community-led store of value backed by Impact
          </TypographyTitleStyle>
          <TypographyMintedTokensStyle gutterBottom>
            ${parseInt(totalDai)} / ${parseInt(maxDai)}
          </TypographyMintedTokensStyle>
          <Grid container item direction="row" justifyContent="center" alignItems="center">
            <Grid container item xs={11} direction="row">
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TypographyPriceStyle>$0.025</TypographyPriceStyle>
              </Grid>
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TypographyPriceStyle>$0.05</TypographyPriceStyle>
              </Grid>
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TypographyPriceStyle>$0.1</TypographyPriceStyle>
              </Grid>
            </Grid>
            <Grid container item xs={1} direction="row"></Grid>
          </Grid>

          <Grid container item direction="row" justifyContent="center" alignItems="center">
            <Grid
              container
              item
              xs={11}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ position: 'relative' }}
            >
              <Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: '#fff',
                    padding: 0,
                    height: '48px',
                    width: '3px',
                    position: 'absolute',
                    bottom: 0,
                    left: '33.334%',
                    zIndex: 100,
                  }}
                />
              </Box>

              <Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    backgroundColor: '#fff',
                    padding: 0,
                    height: '48px',
                    width: '3px',
                    position: 'absolute',
                    bottom: 0,
                    left: '66.667%',
                    zIndex: 100,
                  }}
                />
              </Box>
              <MultiProgress
                transitionTime={1.2}
                elements={[
                  {
                    value:
                      totalDai > secondTrancheFund
                        ? (2 / 3) * 100 +
                          ((totalDai - secondTrancheFund) / thirdPrice / maxSupply) * 100
                        : totalDai > firstTrancheFund
                        ? (1 / 3) * 100 +
                          ((totalDai - firstTrancheFund) / secondPrice / maxSupply) * 100
                        : (totalDai / firstPrice / maxSupply) * 100,
                    color: '#6cbdc3',
                  },
                ]}
                height={36}
                roundLastElement={false}
                backgroundColor="gray"
                border={'3px solid white'}
              />
            </Grid>
            <Grid container item xs={1} direction="row" justifyContent="center" alignItems="center">
              <TypographyPercentStyle gutterBottom>
                {Math.ceil(
                  totalDai > secondTrancheFund
                    ? (2 / 3) * 100 +
                        ((totalDai - secondTrancheFund) / thirdPrice / maxSupply) * 100
                    : totalDai > firstTrancheFund
                    ? (1 / 3) * 100 +
                      ((totalDai - firstTrancheFund) / secondPrice / maxSupply) * 100
                    : (totalDai / firstPrice / maxSupply) * 100
                )}
                %
              </TypographyPercentStyle>
            </Grid>
          </Grid>
          <Grid container item direction="row" justifyContent="center" alignItems="center">
            <Grid container item xs={11} direction="row">
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TypographyPriceStyle>20M pSDA</TypographyPriceStyle>
              </Grid>
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TypographyPriceStyle>20M pSDA</TypographyPriceStyle>
              </Grid>
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TypographyPriceStyle>20M pSDA</TypographyPriceStyle>
              </Grid>
            </Grid>
            <Grid container item xs={1} direction="row"></Grid>
          </Grid>
          <TypographyInfoStyle>
            *If you have not completed the PPM or are not whitelisted please click here{' '}
            <Link
              href="https://t.me/StandardDAO"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#FFCD3E' }}
            >
              https://t.me/StandardDAO
            </Link>
          </TypographyInfoStyle>
          <TypographyInfoStyle>
            Wallet Address:{' '}
            <Link
              href="https://etherscan.io/address/0x6693002C49AF6d485517A443650AB76B88298fE1"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#FFCD3E' }}
            >
              {MULTI_SIG_ADDRESS}
            </Link>
          </TypographyInfoStyle>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 5,
              border: '1px solid rgba(255, 255, 255, 0.24)',
              borderRadius: '50px',
              padding: '0px 4px 0px 24px',
              maxWidth: '400px',
              height: '54px',
            }}
          >
            <RegisterInputStyle
              error={!isNumber}
              required
              placeholder="Amount of DAI"
              disableUnderline={isNumber ? true : false}
              onChange={handleChange}
            />
            <ButtonPurchaseStyle variant="contained" onClick={handlePurchase}>
              Buy pSDA
            </ButtonPurchaseStyle>
          </Box>
        </Grid>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </BoxStyle>
  );
};

export default Home;
