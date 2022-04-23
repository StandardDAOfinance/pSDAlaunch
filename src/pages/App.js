import React from 'react';
import Box from '@mui/material/Box';
import { useEthereumWeb3React } from '../hooks';
import Web3ReactManager from '../components/Web3ReactManager';
import logo from './logo.svg';
import './App.css';

function App() {
  const { active, chainId, deactivate, account, activate } = useEthereumWeb3React();

  return (
    <Web3ReactManager>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Web3ReactManager>
  );
}

export default App;
