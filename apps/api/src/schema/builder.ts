import { FastifyRequest, FastifyReply } from 'fastify';
import { GraphQLDate } from 'graphql-scalars';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { PrismaClient } from '@prisma/client';
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ComplexityPlugin from '@pothos/plugin-complexity';
import ValidationPlugin from '@pothos/plugin-validation';

const builder = new SchemaBuilder<{
  Context: {
    request: FastifyRequest;
    reply: FastifyReply;
    prisma: PrismaClient;
  };
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    Upload: {
      Input: Promise<FileUpload>;
      Output: never;
    };
  };
  AuthScopes: {
    authMutation: boolean;
  };
}>({
  plugins: [ScopeAuthPlugin, ComplexityPlugin, ValidationPlugin],
  authScopes: async (ctx) => ({
    authMutation:
      ctx.request.headers.authorization ===
      `Basic ${process.env.SECRET_MUTATION_KEY}`,
  }),
  complexity: {
    defaultComplexity: 1,
    defaultListMultiplier: 10,
    limit: {
      complexity: 1024,
      depth: 4,
      breadth: 100,
    },
  },
});

builder.addScalarType('Date', GraphQLDate, {});
builder.addScalarType('Upload', GraphQLUpload, {});
builder.queryType({});
builder.mutationType({});

export default builder;
