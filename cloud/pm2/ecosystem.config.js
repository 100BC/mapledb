module.exports = {
  apps: [
    {
      name: 'api',
      cwd: '~/actions-runner/_work/mooseical/mooseical/apps/api',
      script: 'pnpm',
      args: 'start',
      max_restarts: 3,
    },
    {
      name: 'admin',
      cwd: '~/actions-runner/_work/mooseical/mooseical/apps/admin',
      script: 'pnpm',
      args: 'start',
      max_restarts: 3,
    },
    {
      name: 'web',
      cwd: '~/actions-runner/_work/mooseical/mooseical/apps/web',
      script: 'pnpm',
      args: 'start',
      max_restarts: 3,
    },
  ],
};
