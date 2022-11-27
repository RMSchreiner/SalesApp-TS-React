import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "rootroot",
    database: "node_admin",
    entities: [
        "src/entity/*.ts"
    ],
    logging: false,
    synchronize: true
}
);