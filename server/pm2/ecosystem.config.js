module.exports = {
  apps: [
    {
      name: 'api',
      cwd: '../../apps/api',
      script: 'pnpm',
      args: 'start',
      max_restarts: 3,
    },
    {
      name: 'admin',
      cwd: '../../apps/admin',
      script: 'pnpm',
      args: 'start',
      max_restarts: 3,
    },
    {
      name: 'web',
      cwd: '../../apps/web',
      script: 'pnpm',
      args: 'start',
      max_restarts: 3,
    },
  ],
};
