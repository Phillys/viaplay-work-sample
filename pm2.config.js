module.exports = {
  apps : [
    {
      name: 'Viaplay Trailer API',
      script: './build/app.js',
      instances: -1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
