import { Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import bcryptjs from "bcryptjs";
import {User} from "../entity/user.entity"
import{sign,verify} from "jsonwebtoken";
import {dataSource} from "../data-source";




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

    const repository = dataSource.getRepository(User);

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
    const repository = dataSource.getRepository(User);
    
    //if used is duplicate say email already registered or create a new account
    const user = await repository.findOne({where:{email: req.body.email}});

    if(!user){
        return res.status(404).send({
            Message: 'invalid credentials'
        })     
    }

    if(!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    //cookie
    const token = sign({id: user.id}, process.env.SECRET_KEY);

    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 24 * 60 *60 *1000 //1day
     })

    res.send({
        message: 'success'
    });
}

export const AuthenticatedUser = async (req:Request, res: Response) => {
    const {password, ...user} = req['user'];
   res.send(user);
}

export const Logout = async (req: Request, res: Response) => {
   res.cookie('jwt', '', {maxAge: 0});

   res.send({
    message: 'success'
   })
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req['user'];

    const repository = dataSource.getRepository(User);

    await repository.update(user.id, req.body);

    const {password, ...data} = await repository.findOneBy(user.id);

    res.send(data);
}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req['user'];

    if(req.body.password !== req.body.password_confirm){
        return res.status(400).send({
            message: "Password's do not match"
        });
    }

    const repository = dataSource.getRepository(User);

    await repository.update(user.id,{
        password: await bcryptjs.hash(req.body.password, 10)
    });

    const {password, ...data} = user;

    res.send(data);
}