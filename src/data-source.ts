import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
//import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
require("dotenv").config();

const AppDataSource = new DataSource({
    type: (process.env.DB_TYPE || "postgres") as "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),  
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === "true",  
    logging: process.env.DB_LOGGING === "true",  
    entities: [User],
    //migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [],
});

export { AppDataSource };
