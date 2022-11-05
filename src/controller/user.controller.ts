import {Request, Response} from 'express';
import {getManager, Repository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
        const repository = getManager().getRepository(User);

        const users = await repository.find();

        res.send(users.map(u => {
            const {password, ...data} = u;

            return data;
        }));
    };

    export const CreateUser = async (req:Request, res: Response) => {
        const {role_id, ...body} = req.body;
        const hashedPassword = await bcryptjs.hash('1234', 10);

        const repository = getManager().getRepository(User);

        const {password, ...user} = await repository.save({...body,
             password: hashedPassword
            })
    res.send(user);
    }

    export const GetUser = async  (req: Request, res: Response) => {
        const repository = getManager().getRepository(User);


        const {password, ...user} = await repository.findOneBy({id: parseInt(req.params.id)});

        res.send(user);
    }