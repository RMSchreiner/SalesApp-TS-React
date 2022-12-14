import {Router} from "express";
import {Register, Login, Logout, AuthenticatedUser, UpdateInfo, UpdatePassword} from "./controller/auth.controller"
import { AuthMiddleware } from "./middleware/auth.middleware";
import {Users, CreateUser, GetUser, UpdateUser, DeleteUser} from "./controller/user.controller";
import { DataTypeNotSupportedError } from "typeorm";
import {Permissions} from "./controller/permission.controller";
import {CreateRole, Roles, GetRole} from "./controller/role.controller";


export const routes = (router: Router) => {
   router.post('/api/register', Register);
   router.post('/api/login', Login);
   router.get('/api/user', AuthMiddleware, AuthenticatedUser);
   router.post('/api/logout', AuthMiddleware, Logout);
   router.put('/api/users/info', AuthMiddleware, UpdateInfo);
   router.put('/api/users/password', AuthMiddleware, UpdatePassword);

   router.get('/api/users', AuthMiddleware, Users);
   router.post('/api/users', AuthMiddleware, CreateUser);
   router.get('/api/users/:id', AuthMiddleware, GetUser);
   router.put('/api/users/:id', AuthMiddleware, UpdateUser);
   router.delete('/api/users/:id', AuthMiddleware, DeleteUser);

   router.get('/api/permissions', AuthMiddleware, Permissions);

   router.get('/api/roles', AuthMiddleware, Roles);
   router.post('/api/roles', AuthMiddleware, CreateRole);
   router.get('/api/roles/:id', AuthMiddleware, GetRole);
}