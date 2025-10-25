import NavigationCard from '../components/NavigationCard';

const Home = () => {
  const navigationItems = [
    {
      icon: '🌐',
      title: 'Coordinates',
      description: 'Go to coordinates',
      path: '/coordinates',
    },
    {
      icon: '🗺',
      title: 'Locations',
      description: 'Go to locations',
      path: '/locations',
    },
    {
      icon: '🏘',
      title: 'Addresses',
      description: 'Go to addresses',
      path: '/addresses',
    },
    {
      icon: '🏛',
      title: 'Organizations',
      description: 'Go to organizations',
      path: '/organizations',
    },
    {
      icon: '🚧',
      title: 'Special operations',
      description: 'Go to special operations',
      path: '/spec-operations',
    },
  ];

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Welcome</h1>
        <p className="subtitle">
          Information system that allows you to interact with objects of the
          Organization class
        </p>
      </div>

      <div className="navigation-grid">
        {navigationItems.map((item, index) => (
          <NavigationCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
