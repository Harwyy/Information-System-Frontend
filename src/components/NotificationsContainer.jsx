import React from 'react';

const NotificationsContainer = ({
  notifications = [],
  onRemoveNotification,
  position = 'top-right',
  autoClose = true,
  autoCloseDelay = 5000,
  maxNotifications = 5,
}) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  const displayNotifications = notifications.slice(0, maxNotifications);
  const containerClass = `notifications-container ${position}`;

  return (
    <div className={containerClass}>
      {displayNotifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemoveNotification}
          autoClose={autoClose}
          autoCloseDelay={autoCloseDelay}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({
  notification,
  onRemove,
  autoClose,
  autoCloseDelay,
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onRemove(notification.id);
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [notification.id, autoClose, autoCloseDelay, onRemove]);

  const handleRemove = () => {
    onRemove(notification.id);
  };

  return (
    <div className={`notification ${notification.type}`}>
      <div className="notification-content">
        <span className="notification-message">{notification.message}</span>
        <button
          onClick={handleRemove}
          className="notification-close"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      {autoClose && <div className="notification-progress"></div>}
    </div>
  );
};

export default NotificationsContainer;
