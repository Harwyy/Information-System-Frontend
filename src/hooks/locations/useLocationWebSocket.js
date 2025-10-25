import { useCallback } from 'react';

import useWebSocket from '../useWebSocket';

export const useLocationsWebSocket = (loadLocations, getCurrentPagination) => {
  const handleWebSocketMessage = useCallback(
    message => {
      console.log('WebSocket notification received for locations:', message);
      const currentPagination = getCurrentPagination();
      loadLocations(
        currentPagination.page,
        currentPagination.size,
        currentPagination.sortBy,
        currentPagination.direction
      );
    },
    [loadLocations, getCurrentPagination]
  );

  useWebSocket(handleWebSocketMessage);
};
