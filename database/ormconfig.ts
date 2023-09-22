
// ormconfig.ts

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";
import { User } from "../src/entity/User";
import path from 'path';

const dbConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "password",
  database: "webapp",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [path.join(__dirname, './migrations/*.ts')],
  subscribers: []
  
};


export default new  DataSource(dbConfig);



