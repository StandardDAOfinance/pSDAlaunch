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
  ButtonPurchaseStyle,
} from './styleds';
import _ from 'lodash';
import MultiProgress from 'react-multi-progress';

const Home = () => {
  const [toastInfo, setToastInfo] = useState({});
  const [isToast, setIsToast] = useState(false);
  const isLoading = false;

  const handleToastClose = () => {
    setIsToast(false);
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
          <TypographyMintedTokensStyle gutterBottom>
            20,000,00 pSDA / 60,000,000 pSDA
          </TypographyMintedTokensStyle>
          <Grid container item direction="row" justifyContent="center" alignItems="center">
            <Grid container item xs={4} direction="row" justifyContent="center" alignItems="center">
              <TypographyPriceStyle>$0.025</TypographyPriceStyle>
            </Grid>
            <Grid container item xs={4} direction="row" justifyContent="center" alignItems="center">
              <TypographyPriceStyle>$0.05</TypographyPriceStyle>
            </Grid>
            <Grid container item xs={4} direction="row" justifyContent="center" alignItems="center">
              <TypographyPriceStyle>$0.1</TypographyPriceStyle>
            </Grid>
          </Grid>

          <Grid
            container
            item
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
                  width: '2px',
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
                  width: '2px',
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
          <TypographyInfoStyle>
            *If you are not whitelisted please click here{' '}
            <Link
              href="https://t.me/StandardDAO"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#FFCD3E', opacity: 0.87 }}
            >
              https://t.me/StandardDAO
            </Link>
          </TypographyInfoStyle>
          <ButtonPurchaseStyle variant="contained">Buy pSDA Tokens</ButtonPurchaseStyle>
        </Grid>
      </Container>
    </BoxStyle>
  );
};

export default Home;
