import {dataSource} from "../data-source";
import {Order} from "../entity/order.entity";
import { faker } from '@faker-js/faker';
import {randomInt} from "crypto";

dataSource.initialize().then (async connection => {
    const repository = dataSource.getRepository(Order);
    for (let i = 0; i < 30 ; i++) {
          const order = await repository.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
           })
    }

    process.exit(0);

}); 