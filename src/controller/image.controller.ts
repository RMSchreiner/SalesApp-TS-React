import {Request, Response} from "express";
import multer from "multer"; 
import {extname} from 'path';

interface MulterRequest extends Request{
    file: any;
}

export const Upload = async (req: Request, res:Response) => {

    const storage = multer.diskStorage({
        destination: 'uploads/',
        filename(_, file, callback){
             const randomName = Math.random().toString(20).substr(2, 12);
             return callback(null,`${randomName}${extname(file.originalname)}`);
        }
     })

    const upload = multer({storage}).single('image');

    upload(req, res, (err) => {
        res.send({
            url: `http://localhost:8000/api/uploads/${(req as MulterRequest).file.filename}`
        })
    })
}
