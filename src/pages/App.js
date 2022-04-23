import React from 'react';
import Box from '@mui/material/Box';
import { useEthereumWeb3React } from '../hooks';
import Web3ReactManager from '../components/Web3ReactManager';
import NavBar from '../components/NavBar';

function App() {
  const { active, chainId, deactivate, account, activate } = useEthereumWeb3React();

  return (
    <>
      <NavBar active={active} deactivate={deactivate} account={account} activate={activate} />

      <Web3ReactManager>
        <Box></Box>
      </Web3ReactManager>
    </>
  );
}

export default App;
