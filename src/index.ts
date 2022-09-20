import express, {Request, Response} from 'express';
import cors from 'cors';
import {routes} from "./routes";
import { createConnection } from 'typeorm';

//understands connection addresses are in ormconfig.json
createConnection().then(connection =>{
    const app = express();

    app.use(express.json());
    app.use(cors({
        credentials: true, //allows front end to get the cookie
        origin: ["http://localhost:3000"]
    }));
    
    routes(app);
    
    app.listen(8000, () => {
        console.log('listening to port 8000')
    });    

});

