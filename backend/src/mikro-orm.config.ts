import { MikroORMOptions } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import path from 'path';

const pathToSrc = path?.join(process.cwd(), 'src');
const dbPathFromRepositoryRoot = path?.join(pathToSrc, 'migrations');

const config: Partial<MikroORMOptions> = {
  entities: process.env.CLI === '1' ? ['./src/**/*.entity.ts'] : [],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'quiz.sqlite3',
  driver: SqliteDriver,
  extensions: [Migrator],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: dbPathFromRepositoryRoot, // path to the folder with migrations
    pathTs: dbPathFromRepositoryRoot, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts' as any, // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
};

export default config;
