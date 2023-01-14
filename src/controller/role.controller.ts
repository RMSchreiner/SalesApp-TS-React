import {Request, Response} from "express";
import { Entity } from "typeorm";
import { dataSource } from "../data-source";
import {Role} from "../entity/role.entity";

export const Roles = async(req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);

    res.send(await repository.find());
}

export const CreateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;

    const repository = dataSource.getRepository(Role);

    const role = await repository.save({
        name, 
        permissions: permissions.map(id => ({id}))
    });
    
    res.status(201).send(role);
}

export const GetRole = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);
    
    res.send(await repository.findOne({
        where: {id : parseInt(req.params.id)},
        relations:{
            permissions: true,
        }
    }))};

    export const UpdateRole = async (req: Request, res: Response) => {
        const {name, permissions} = req.body;
        
        const repository = dataSource.getRepository(Role);

        const role = await repository.save({
            id: parseInt(req.params.id),
            name,
            permissions: permissions.map(id => ({id}))
        });

        res.status(202).send(role);

    }

    export const DeleteRole = async (req:Request, res: Response) => {
        const repository = dataSource.getRepository(Role);

        await repository.delete(req.params.id);

        res.status(204).send(null);

    }
