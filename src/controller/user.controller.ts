import {Request, Response} from 'express';
import {} from "typeorm";
import bcryptjs from "bcryptjs";
import {User} from "../entity/user.entity";
import {dataSource} from "../data-source";


export const Users = async (req: Request, res: Response) => {
        const repository = dataSource.getRepository(User);

        const users = await repository.find({
            relations: ['role']
        });

        res.send(users.map(u => {
            const {password, ...data} = u;

            return data;
        }));
    };

    export const CreateUser = async (req:Request, res: Response) => {
        const {role_id, ...body} = req.body;
        const hashedPassword = await bcryptjs.hash('1234', 10);

        const repository = dataSource.getRepository(User);

        const {password, ...user} = await repository.save({...body,
             password: hashedPassword,
             role: {
                id: role_id
            }
        })

    res.status(201).send(user);
    }


    //middleware to make sure we do not error if the called id is not available
    
    export const GetUser = async  (req: Request, res: Response) => {
        const repository = dataSource.getRepository(User);

        const {password, ...user} = await repository.findOne({where: {id: parseInt(req.params.id)}, relations: ['role']});

        res.send(user);
    }

    export const UpdateUser = async(req: Request,res: Response) => {
        const {role_id, ...body} = req.body;

        const repository = dataSource.getRepository(User);
 
        await repository.update(req.params.id, {...body,
            role: {
                id: role_id
            }
            });

        const {password, ...user} = await repository.findOne({where: {id: parseInt(req.params.id)}, relations: ['role']});

        res.status(202).send(user);
    }

    export const DeleteUser = async (req: Request, res: Response) => {
        const repository = dataSource.getRepository(User);

        await repository.delete(req.params.id);

        res.status(204).send(null);
    }