import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

const useWebSocket = onMessageCallback => {
  const stompClient = useRef(null);
  const callbackRef = useRef(onMessageCallback);

  useEffect(() => {
    callbackRef.current = onMessageCallback;
  }, [onMessageCallback]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      debug: str => {
        console.log('STOMP: ', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.current.onConnect = frame => {
      console.log('Connected: ' + frame);

      stompClient.current.subscribe('/topic/all', message => {
        console.log('Received WebSocket message: ', message.body);
        if (callbackRef.current) {
          callbackRef.current(message.body);
        }
      });
    };

    stompClient.current.onStompError = frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  return stompClient;
};

export default useWebSocket;
