import { useCallback } from 'react';

import useWebSocket from '../useWebSocket';

export const useOrganizationWebSocket = (
  loadOrganization,
  getCurrentPagination
) => {
  const handleWebSocketMessage = useCallback(
    message => {
      console.log(
        'WebSocket notification received for organizations:',
        message
      );
      const currentPagination = getCurrentPagination();
      loadOrganization(
        currentPagination.page,
        currentPagination.size,
        currentPagination.sortBy,
        currentPagination.direction
      );
    },
    [loadOrganization, getCurrentPagination]
  );

  useWebSocket(handleWebSocketMessage);
};
