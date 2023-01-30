import {dataSource} from "../data-source";
import {Product} from "../entity/product.entity";
import { faker } from '@faker-js/faker';
import {randomInt} from "crypto";

dataSource.initialize().then (async connection => {
    const repository = dataSource.getRepository(Product);
    for (let i = 0; i < 30 ; i++) {
           await repository.save({
            title: faker.lorem.words(2),
            description: faker.lorem.words(20),
            image: faker.image.imageUrl(200, 200, '', true ),
            price: randomInt(10, 100),
           })
    }

    process.exit(0);

}); 