import { useMemo } from 'react';
import { useEthereumWeb3React, useEthereumNetworkWeb3React } from './index';
import getContract from '../utils/getContract';

// returns null on errors
export function useEthereumContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useEthereumWeb3React();

  return useMemo(() => {
    try {
      if (ABI.length === 0) return null;
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useEthereumNetworkContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useEthereumNetworkWeb3React();

  return useMemo(() => {
    try {
      if (ABI.length === 0) return null;
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}
