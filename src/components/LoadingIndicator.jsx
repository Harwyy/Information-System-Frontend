const LoadingIndicator = ({
  loading = false,
  getByIdLoading = false,
  loadingText = 'Loading data...',
  searchingText = 'Searching...',
}) => {
  if (!loading && !getByIdLoading) {
    return null;
  }

  const text = getByIdLoading ? searchingText : loadingText;

  return (
    <div className="fixed-loading-indicator">
      <div className="loading-spinner"></div>
      <span>{text}</span>
    </div>
  );
};

export default LoadingIndicator;
