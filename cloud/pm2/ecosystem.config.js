module.exports = {
  apps: [
    {
      name: 'server',
      cwd: '~/actions-runner/_work/mooseical/mooseical/apps/server',
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
