import fastify from '@server';
import { IS_DEV } from '@utils/constants';

/* INIT */
fastify.get('/', async (_request, reply) => {
  if (IS_DEV) return reply.redirect(307, '/altair');
  return reply.code(404).send({ message: 'Not Found' });
});

fastify.listen(process.env.PORT || 5000, (err, _address) => {
  if (err) throw err;
});
