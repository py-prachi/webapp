import "reflect-metadata"
import { DataSource } from "typeorm"
//import { User } from "./entity/User"


import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "./entity/User";

console.log(`in the data Source ${__dirname}/entity`);
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ashishjagtap",
    password: undefined,
    database: "webapp",
    synchronize: true,
    logging: false,
    entities: [User],
    //migrations: [],
    subscribers: [],
});

export {AppDataSource};
