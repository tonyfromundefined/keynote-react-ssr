module.exports = {
  apps: [
    {
      name: 'aws-react-ssr-demo-react-renderer',
      script: './dist/index.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
}
