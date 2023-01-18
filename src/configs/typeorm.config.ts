import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: 'localhost',
  port: dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: 'todos',
  entities: [__dirname + '../../**/*.entity.{js,ts}'],
  synchronize: true,
  timezone: 'Asia/Seoul',
};
