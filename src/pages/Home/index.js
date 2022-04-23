import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Header } from '../../components/Backgrounds';
import { WalletToast } from '../../components/Toast';
import { SEVERITY, MESSAGE } from '../../constants/wallet';
import { BoxStyle, TypographyTitleStyle } from './styleds';
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
        <Grid container direction="column" justifyContent="space-around" alignItems="center">
          <TypographyTitleStyle gutterBottom>Bringing the impact back to ESG</TypographyTitleStyle>

          <Grid container item direction="row" justifyContent="center" alignItems="center">
            <MultiProgress
              transitionTime={1.2}
              elements={[
                {
                  value: 70,
                  color: '#105759',
                  showPercentage: true,
                  textColor: '#fff',
                  fontSize: 24,
                },
              ]}
              height={36}
              // backgroundColor="gray"
              // border={'1px solid red'}
            />
            {/* #c4a4cc
            #332b80
            #6cbdc3
            #1a9299
            #105759 */}
          </Grid>
        </Grid>
      </Container>
    </BoxStyle>
  );
};

export default Home;
