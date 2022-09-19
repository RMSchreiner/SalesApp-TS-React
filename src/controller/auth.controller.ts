import { Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import{getManager} from "typeorm";
import bcryptjs from "bcryptjs";
import {User} from "../entity/user.entity"


export const Register =  async (req: Request, res: Response) => {
    const body = req.body;

    const {error} = RegisterValidation.validate(body);

    //express validation does basic
    if (error){
        return res.status(400).send(error.details);
    } 

    //password validation
    if(body.password !== body.password_confirm){
         return res.status(400).send({
            message: "Passwords do not match"
         });
    }

    const repository = getManager().getRepository(User);

    //this deconstructs the password
const {password, ...user} = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10)
})

    res.send(user);
}

export const Login = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    
    const user = await repository.findOne({where:{email: req.body.email}});

    if(!user){
        return res.status(404).send({
            Message: 'User not found'
        })     
    }

    if(!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    res.send(user);
}