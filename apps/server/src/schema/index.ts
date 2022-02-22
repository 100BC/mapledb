import { printSchema, lexicographicSortSchema } from 'graphql';
import { writeFileSync } from 'fs';

import builder from './builder';
import './query';
import './mutation';
import './types';

const schema = builder.toSchema({});

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync(`${__dirname}/../../schema.graphql`, schemaAsString);

export default schema;
