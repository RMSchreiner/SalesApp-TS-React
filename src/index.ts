require('dotenv').config(); 

import express, {Request, Response} from 'express';
import cors from 'cors';
import {routes} from "./routes";
import cookieParser from "cookie-parser";
import {dataSource} from "./data-source";
import Connection from 'mysql2/typings/mysql/lib/Connection';

dataSource.initialize().then(() =>{
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true, //allows front end to get the cookie
        origin: ["http://localhost:3000"]
    }));
    
    routes(app);
    
    app.listen(8000, () => {
        console.log('listening to port 8000')
    });    

})
.catch ((error) => console.log("express error"));

