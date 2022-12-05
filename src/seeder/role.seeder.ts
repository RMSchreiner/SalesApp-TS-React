
import {dataSource} from "../data-source";
import { Permission } from "../entity/permission.entity";
import {Role} from "../entity/role.entity";

//package json needs to have the "roles:seed: ts-node src/seeder/role.seeder.ts" command added to scripts

//roles did not populate correct

dataSource.initialize().then(async () =>{

const permissionRespository = dataSource.getRepository(Permission);

const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders'];

let permissions = [];

for (let i = 0; i< perms.length; i++){
    permissions.push(await permissionRespository.save({
        name: perms[i]
    }));
}

const roleRepository = dataSource.getRepository(Role);

await roleRepository.save({
    name: 'Admin',
    permissions
});

delete permissions[3];

await roleRepository.save({
    name: 'Editor',
    permissions
})

delete permissions[1];
delete permissions[5];
delete permissions[7];

await roleRepository.save({
    name: 'Viewer',
    permissions
})

  process.exit(0);
});