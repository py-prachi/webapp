import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
//import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "password",
  database: "webapp",
  synchronize: false,
  logging: false,
  entities: [User],
  //migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});

export { AppDataSource };
