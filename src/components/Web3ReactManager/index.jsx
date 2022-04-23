import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { EthereumNetworkContextName } from '../../constants';
import { ethereumNetwork } from '../../connectors';

export default function Web3ReactManager({ children }) {
  const { active: ethereumNetworkActive, activate: activateEthereumNetwork } = useWeb3React(
    EthereumNetworkContextName
  );

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect is active, activate polygon network
  useEffect(() => {
    if (triedEager && !ethereumNetworkActive) {
      activateEthereumNetwork(ethereumNetwork);
    }
  }, [activateEthereumNetwork, ethereumNetworkActive, triedEager]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  return children;
}
