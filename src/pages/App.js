import React from 'react';
import Box from '@mui/material/Box';
import { useEthereumWeb3React } from '../hooks';
import Web3ReactManager from '../components/Web3ReactManager';
import NavBar from '../components/NavBar';
import Footer from './Footer';
import Home from './Home';

function App() {
  const { active, chainId, deactivate, account, activate } = useEthereumWeb3React();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavBar active={active} deactivate={deactivate} account={account} activate={activate} />
      <Box sx={{ flexGrow: 1 }}>
        <Web3ReactManager>
          <Home />
        </Web3ReactManager>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
