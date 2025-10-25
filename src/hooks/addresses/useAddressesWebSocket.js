import { useCallback } from 'react';

import useWebSocket from '../useWebSocket';

export const useAddressesWebSocket = (loadAddresses, getCurrentPagination) => {
  const handleWebSocketMessage = useCallback(
    message => {
      console.log('WebSocket notification received for addresses:', message);
      const currentPagination = getCurrentPagination();
      loadAddresses(
        currentPagination.page,
        currentPagination.size,
        currentPagination.sortBy,
        currentPagination.direction
      );
    },
    [loadAddresses, getCurrentPagination]
  );

  useWebSocket(handleWebSocketMessage);
};
