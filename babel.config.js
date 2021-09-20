module.exports = {
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '/': './',
        },
        stripExtensions: ['.js', '.jsx'],
      },
    ],
  ],
};
