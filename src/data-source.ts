//data-source.ts

import "reflect-metadata";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "./entity/User";
import { Products } from "./entity/Products";
import { ProductDiscount } from "./entity/ProductDiscounts";
import { Discount } from "./entity/discount";
require("dotenv").config();

const dbConfig: PostgresConnectionOptions = {
    type: (process.env.DB_TYPE || "postgres") as "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),  
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === "true",  
    logging: process.env.DB_LOGGING === "true",  
    entities: [User, Products, Discount,ProductDiscount],
    subscribers: [],
};

const AppDataSource = new DataSource(dbConfig);
export { AppDataSource , dbConfig};


