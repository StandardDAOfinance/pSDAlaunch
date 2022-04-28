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
import {
  BoxStyle,
  TypographyTitleStyle,
  TypographyMintedTokensStyle,
  TypographyPriceStyle,
  TypographyInfoStyle,
  TypographyPercentStyle,
} from './styleds';
import _ from 'lodash';
import MultiProgress from 'react-multi-progress';
import PurchaseButton from './PurchseButton';

const Home = () => {
  const [toastInfo, setToastInfo] = useState({});
  const [isToast, setIsToast] = useState(false);
  const [amount, setAmount] = useState(null);
  const [input, setInput] = useState();
  const [isNumber, setIsNumber] = useState(true);

  const isLoading = false;

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

  const handlePurchase = () => {
    console.log('purchase handle');
  };

  const handleChange = (event) => {
    const result = checkIsNumber(event.target.value);
    console.log(result);
    if (result) {
      setAmount(event.target.value);
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
  };

  if (isLoading) {
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
          <TypographyTitleStyle gutterBottom>Bringing the impact back to ESG</TypographyTitleStyle>
          <TypographyMintedTokensStyle gutterBottom>$2.4M / $3.5M</TypographyMintedTokensStyle>
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
                    left: '33.3%',
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
                    left: '66.6%',
                    zIndex: 100,
                  }}
                />
              </Box>
              <MultiProgress
                transitionTime={1.2}
                elements={[
                  {
                    value: 70,
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
              <TypographyPercentStyle gutterBottom>70%</TypographyPercentStyle>
            </Grid>
          </Grid>
          <TypographyInfoStyle>
            *If you are not whitelisted please click here{' '}
            <Link
              href="https://t.me/StandardDAO"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#FFCD3E' }}
            >
              https://t.me/StandardDAO
            </Link>
          </TypographyInfoStyle>
          <PurchaseButton
            sx={{ mt: 6 }}
            handlePurchase={handlePurchase}
            handleChange={handleChange}
            isNumber={isNumber}
            inputRef={(node) => {
              setInput(node);
            }}
          />
        </Grid>
      </Container>
    </BoxStyle>
  );
};

export default Home;
