import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        //dotenv
        const payload: any = verify(jwt, process.env.SECRET_KEY);
    
        if (!payload) {
            return res.status(401).send({message: 'unauthenticated'
        });
        };
    
        const repository = getManager().getRepository<typeof user>(User);
    
        const user = await repository.findOneBy(payload.id);

        req["user"]= user;

        next();
    } catch (e) { 
        return res.status(401).send({message: 'unauthenticated'
    });
}
}