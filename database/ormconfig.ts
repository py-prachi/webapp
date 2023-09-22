// ormconfig.ts

import { DataSource } from "typeorm";

import path from 'path';
import { dbConfig } from "../src/data-source";

const ormConfig = {
  ...dbConfig, 
  migrations: [path.join(__dirname, './migrations/*.ts')],
};
  
export default new  DataSource(ormConfig);



