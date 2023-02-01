import {dataSource} from "../data-source";
import {Order} from "../entity/order.entity";
import {OrderItem} from "../entity/order-item.entity";
import { faker } from '@faker-js/faker';
import {randomInt} from "crypto";

dataSource.initialize().then (async connection => {

    const orderRepository = dataSource.getRepository(Order);
    const orderItemRepository = dataSource.getRepository(OrderItem);
    
    for (let i = 0; i < 30 ; i++) {
          const order = await orderRepository.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
           });

           for (let j = 0; j < randomInt(1,5); j++){
            await orderItemRepository.save({
              order,
              product_title: faker.lorem.words(2),
              price: randomInt(10,100),
              quantity: randomInt(1,5)
            })
           }
    }

    process.exit(0);

}); 