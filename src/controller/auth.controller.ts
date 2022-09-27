import { Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import{getManager, SimpleConsoleLogger} from "typeorm";
import bcryptjs from "bcryptjs";
import {User} from "../entity/user.entity"
import{sign,verify} from "jsonwebtoken";




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
    const token = sign({id: user.id}, "secret");

    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 24 * 60 *60 *1000 //1day
     })

    res.send({
        message: 'success'
    });
}

export const AuthenticatedUser = async (req:Request, res: Response) => {
    const jwt = req.cookies['jwt'];

    const payload: any = verify(jwt, "secret");

    if (!payload) {
        return res.status(401).send({message: 'unauthenticated'
    });
    };

    const repository = getManager().getRepository<typeof user>(User);

    const {password, ...user} = await repository.findOneBy(payload.id
        ).catch(function (error){console.log("id not found")});

    res.send(user);
}

export const Logout = async (req: Request, res: Response) => {
   res.cookie('jwt', '', {maxAge: 0});

   res.send({
    message: 'success'
   })
}