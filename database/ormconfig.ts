
// ormconfig.ts

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";
import { User } from "../src/entity/User";
import path from 'path';

const dbConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ashishjagtap",
  password: undefined,
  database: "webapp",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [path.join(__dirname, './migrations/*.ts')],
  subscribers: []
  
};

const cliConfig = {
  migrationsDir: 'database/migrations', // Relative to tsconfig.json
};

// export = {
//   ...dbConfig,
//   cli: cliConfig,
// };

export default new  DataSource(dbConfig);





// import { AppDataSource } from "./data-source";

// AppDataSource.initialize()

// module.exports = {AppDataSource}






// import { AppDataSource } from "./data-source";

// async function initializeDataSource() {
//   try {
//     await AppDataSource.initialize();
//     console.log("AppDataSource initialized successfully");
//   } catch (error) {
//     console.error("Error initializing AppDataSource:", error);
//   }
// }

// // Export the initialized AppDataSource instance (optional)
// module.exports = { AppDataSource, initializeDataSource };
