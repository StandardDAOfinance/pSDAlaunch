import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Header } from '../../components/Backgrounds';
import { WalletToast } from '../../components/Toast';
import { SEVERITY, MESSAGE } from '../../constants/wallet';
import { BoxStyle, TypographyTitleStyle } from './styleds';
import _ from 'lodash';

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
        <TypographyTitleStyle gutterBottom>Bringing the impact back to ESG</TypographyTitleStyle>
      </Container>
    </BoxStyle>
  );
};

export default Home;
