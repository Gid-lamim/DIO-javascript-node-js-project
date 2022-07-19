import { Router, Request, Response, NextFunction} from "express";

const statusRoute = Router();

//this will help the api consumers to check whether the api is up and running 
statusRoute.get('/status', (req:Request, res:Response, next:NextFunction)=>{
    res.sendStatus(200);
});

export default statusRoute;