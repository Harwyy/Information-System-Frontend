import { useCallback } from 'react';

import useWebSocket from '../useWebSocket';

export const useCoordinatesWebSocket = (
  loadCoordinates,
  getCurrentPagination
) => {
  const handleWebSocketMessage = useCallback(
    message => {
      console.log('WebSocket notification received:', message);
      const currentPagination = getCurrentPagination();
      loadCoordinates(
        currentPagination.page,
        currentPagination.size,
        currentPagination.sortBy,
        currentPagination.direction
      );
    },
    [loadCoordinates, getCurrentPagination]
  );

  useWebSocket(handleWebSocketMessage);
};
