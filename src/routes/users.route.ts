import { Router, Request, Response, NextFunction} from "express";

/*operations we want to perform
    get / users    
    get /users/:uuid   get user by id
    post /users    save new user
    put /users/:uuid    edit user by id
    delete / users/:uuid delete user by id
*/

const userRoute = Router();

//an express function needs three parameters: request, response and next function.
// http:localhost:3000/users
userRoute.get('/users', (req:Request, res:Response, next:NextFunction)=>{
    const users = [{userName:'Renan'}];
    res.status(200).send({users});
});

export default userRoute;