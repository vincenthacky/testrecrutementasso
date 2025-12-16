import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Transaction } from '../modules/transactions/entities/transaction.entity';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Transaction],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: ['error', 'warn'],
});
