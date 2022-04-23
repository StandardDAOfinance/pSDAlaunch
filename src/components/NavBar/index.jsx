import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { injected } from '../../connectors';
import { displayAddress } from '../../utils/displayAddress';
import logo from '../../assets/images/logo.svg';
import PropTypes from 'prop-types';

const fontBlinker = { fontFamily: 'Blinker', fontStyle: 'normal', fontWeight: 'bold' };
const WalletButton = styled(Button)({
  color: '#FFD945',
  ...fontBlinker,
  fontSize: '16px',
  textTransform: 'capitalize',
  border: '1px solid rgba(255, 217, 69, 0.24)',
  borderRadius: '24px',
  '&:hover': {
    borderColor: '#ffc107',
  },
});

const AppBarStyle = styled(AppBar)({
  background: 'rgba(18, 18, 18, 0.5)',
  backdropFilter: 'blur(48px)',
});

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const NavBar = (props) => {
  const { deactivate, account, activate, active } = props;

  const handleClick = () => {
    active ? deactivate() : activate(injected);
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBarStyle>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', padding: '5px' }}>
              <img alt="pSDA" src={logo} width="55" />
            </Box>
            <WalletButton variant="outlined" onClick={handleClick}>
              {active ? displayAddress(account) : 'Connect Wallet'}
            </WalletButton>
          </Toolbar>
        </AppBarStyle>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

export default NavBar;
