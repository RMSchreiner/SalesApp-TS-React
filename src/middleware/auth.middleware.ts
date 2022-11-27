import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {User} from "../entity/user.entity";
import {dataSource} from "../data-source";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        //dotenv
        const payload: any = verify(jwt, process.env.SECRET_KEY);
    
        if (!payload) {
            return res.status(401).send({message: 'unauthenticated'
        });
        };
    
        const repository = dataSource.getRepository<typeof user>(User);
    
        const user = await repository.findOneBy(payload.id);

        req["user"]= user;

        next();
    } catch (e) { 
        return res.status(401).send({message: 'unauthenticated'
    });
}
}