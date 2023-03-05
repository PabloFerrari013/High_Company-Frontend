module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'npm',
      args: 'run start',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
