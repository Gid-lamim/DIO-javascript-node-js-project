import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const authorizationHEader = req.headers['authorization']; // this will get the authorization from the request header.
        //now I need to check wheather the authorization exists or not.
        if (!authorizationHEader) {
            throw new ForbiddenError('Credencias não informadas');
            //in the real world, it's not a good idea to use intuitive messages like this one. 
        }

        //'Basic YWRtaW46YWRtaW4   the authentication will come this way, separated by a space.
        // we need to use destructuring to get the two values. 
        const [authenticationType, token ] = authorizationHEader.split(' ');

        //now we need if the authentication type is Basic and the token exists
        if (authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

       const tokenContent = Buffer.from(token, 'base64').toString('utf-8'); 
       
       //the toke will be converted to user:password  ex: admin:admin
       const [username, password] = tokenContent.split(':');
       
       //check if the username and password were given
       if (!username || !password){
        throw new ForbiddenError('Usuário e senha não preenchidos');
       }

       const user = await userRepository.findUserByUsernameAndPassword(username,password); 
       
       console.log();
        
    } catch (error) {
        next(error);
    }
        
})


export default authorizationRoute;