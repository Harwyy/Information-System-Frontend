import { useState, useCallback } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback(id => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback((message, type = 'error') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
