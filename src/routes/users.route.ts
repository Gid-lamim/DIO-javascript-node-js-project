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

//this route will be used o locate a user by its id.
//with express, we use ':' to say that the next part of the url is dynamic(variable)
userRoute.get('/users/:uuid', (req:Request, res:Response, next:NextFunction)=>{
    //req.params will give me the value entered in the url.
    //for example: http:localhost:3000/users/1234 will have 1234 as uuid
    const uuid = req.params.uuid;
    res.sendStatus(200);
});

//now let's create a route to create a new user.
//to use POST we need postman or other apps. We can't use the browser.
userRoute.post('/users', (req:Request, res:Response, next:NextFunction)=>{
    const newUser = req.body;
    
    res.status(201).send(newUser);
});

export default userRoute;