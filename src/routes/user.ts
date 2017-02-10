import { Model } from 'mongoose';
import { IUserModel } from './../models/user';
import { IUser } from './../interfaces/user';
import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import { Router } from 'express';
//todo follow this guide to add controller https://dinozafirakos.com/2014/06/16/typescript-and-the-mean-stack-getting-started-part-2/

export class UserApi {
    static userModel: Model<IUserModel>;
    public static create(router: Router, userModel: Model<IUserModel>) {
        //log
        console.log("[UserApi::create] Creating UserApi route.");

        this.userModel = userModel;
        router.get("/user", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().get(req, res, next);
        });

        router.get("/user/:id", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().getOne(req, res, next);
        });

        router.post("/user", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().post(req, res, next);
            console.log(req.body);
        });

        router.put("/user/:id", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().put(req, res, next);
            console.log(req.body);
        });
        router.delete("/user/:id", (req: Request, res: Response, next: NextFunction) => {
            new UserApi().delete(req, res, next);
            console.log(req.body);
        });
    }
    constructor() {


    }

    get(req: Request, res: Response, next: NextFunction) {
        UserApi.userModel.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });

    }

    getOne(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'get one' });
    }

    post(req: Request, res: Response, next: NextFunction) {
        let user: IUser =
            {
                firstName: 'Rezwan',
                LastName: 'Khan',
                email: 'rezwanislam@gmail.com'
            }
        new UserApi.userModel(user).save().then((result) => {
            res.json({ message: 'posted' });
        }, (err) => {
                res.json({ message: 'not postedpost' });
            });
    }

    put(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'put' });
    }

    delete(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'delete' });
    }
}