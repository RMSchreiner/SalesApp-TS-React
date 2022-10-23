import {Router} from "express";
import {Register, Login, Logout, AuthenticatedUser, UpdateInfo, UpdatePassword} from "./controller/auth.controller"
import { AuthMiddleware } from "./middleware/auth.middleware";
import {Users, CreateUser, GetUser} from "./controller/user.controller";
import { DataTypeNotSupportedError } from "typeorm";


export const routes = (router: Router) => {
   router.post('/api/register', Register);
   router.post('/api/login', Login);
   router.get('/api/user', AuthMiddleware, AuthenticatedUser);
   router.post('/api/logout', AuthMiddleware, Logout);
   router.put('/api/users/info', AuthMiddleware, UpdateInfo);
   router.put('/api/users/password', AuthMiddleware, UpdatePassword);

   router.get('/api/users', AuthMiddleware, Users);
   router.post( '/api/users', AuthMiddleware, CreateUser);
   router.get('/api/users/:id', AuthMiddleware, GetUser);
}