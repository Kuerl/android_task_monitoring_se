import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const ormconfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/db/migration/*.js'],
  cli: {
    migrationsDir: './src/db/migration',
  },
  synchronize: false,
};

export default ormconfig;
