import Fastify from 'fastify';
import Cloudinary from 'cloudinary';
import mercurius from 'mercurius';
import cors from 'fastify-cors';
import { PrismaClient } from '@prisma/client';
import mercuriusUpload from 'mercurius-upload';
import compress from 'fastify-compress';
import helmet from 'fastify-helmet';
import fastifyRateLimit from 'fastify-rate-limit';
import altair from 'altair-fastify-plugin';

import { IS_DEV } from '@utils/constants';
import schema from './schema';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

Cloudinary.v2.config({
  cloud_name: 'mooseical',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fastify = Fastify({
  logger: {
    prettyPrint: {
      translateTime: 'yyyy-mm-dd HH:MM:ss Z',
      colorize: true,
      ignore:
        'pid,hostname,req.headers.authorization,req.headers.forwarded,req.headers.host',
    },
    level: IS_DEV ? 'debug' : 'info',
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          hostname: request.hostname,
          remoteAddress: request.headers.forwarded || request.ip,
          remotePort: request.socket.remotePort,
        };
      },
    },
  },
});

/* MIDDLEWARE */
fastify.register(compress, {
  onUnsupportedEncoding: (encoding, _request, reply) => {
    reply.code(406);
    return `We do not support the ${encoding} encoding.`;
  },
});

fastify.register(helmet, {
  contentSecurityPolicy: !IS_DEV, // content Security prevents graphiql from
});

fastify.register(cors, {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://www.mooseical.com',
  ],
});

fastify.register(fastifyRateLimit, {
  max: 50,
  ban: 4,
  timeWindow: 1000 * 60,
  logLevel: 'info',
  allowList: (req) => {
    return (
      req.headers.authorization === `Basic ${process.env.SECRET_QUERY_KEY}`
    );
  },
});

/* GRAPHQL */
fastify.register(mercuriusUpload, {
  maxFileSize: 1000000, // 1mb
  maxFiles: 1,
});

fastify.register(mercurius, {
  schema,
  graphiql: false,
  ide: false,
  path: '/graphql',
  jit: 1,
  context: (request, reply) => ({
    request,
    reply,
    prisma,
  }),
});

if (IS_DEV) {
  fastify.register(altair, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
  });
}

export default fastify;
export const logger = fastify.log;
export const { ErrorWithProps } = mercurius;
export const cloudinary = Cloudinary.v2;

// if (IS_DEV) {
//   prisma.$on('query', (e) => {
//     logger.debug(`Query: ${e.query}`);
//     logger.debug(`Duration: ${e.duration}ms`);
//   });
// }
