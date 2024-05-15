module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            // Setup your aliases here
            "@actions": "./store/actions", // This assumes your store directory is at the root
            "@reducers": "./store/reducers", // Example: Adding reducers
            "@screens": "./Screens" // Assuming you have a Screens directory at the root
          }
        }
      ]
    ]
  };
};
