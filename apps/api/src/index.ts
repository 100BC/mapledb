import fastify from '@server';

import { IS_DEV } from '@utils/constants';

/* INIT */
fastify.get('/*', async (_request, reply) => {
  if (IS_DEV) return reply.redirect(307, '/altair');
  return reply.callNotFound();
});

fastify.listen(3002, (err, _address) => {
  if (err) throw err;
});
