import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';
   
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

       //it'll look for this user in the database now.
       const user = await userRepository.findUserByUsernameAndPassword(username,password); 
       
       //user is possibly null, so I need to take care of that first.
       if(!user){
        throw new ForbiddenError('usuário ou senha inválidos');
       }

       /* Here we have some signature options.

            Issuer (iss)
            Subject (sub)
            Audience (aud)
            Expiration time (exp)
            Not before (nbf)
            Issued at (iat)
            JWT ID (jti)

            The subject claim (sub) normally describes to whom or to which application the JWT is issued. The issued at claim (iat) can be used to store the time at which the JWT is created, thus allowing JWTs to be invalidated after a certain amount of time. Other custom claims can be added.

            https://auth0.com/blog/json-web-token-signing-algorithms-overview/
                
       */
      
       const jwtPayload = {username: user.username};
       const jwtOptions = {subject: user.uuid};
       const secretKey = 'my_secret_key'; 

       //the following line will generate the jwt token
       const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

       //now the token will be sent back to the user as a response
       res.status(200).json({token:jwt});

       /* an example of response would be:
       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU4NzY1MDQ3LCJzdWIiOiJhNzhlMWU3ZS1kYTEyLTQzNWYtOTAxZC05ZWRiZDhhYzg0OWIifQ.DIo-AfqPZmwwUFttZpIJS1ZHQnbfIHE6iK4o3014LdY
      
       now, using the JWT website (https://jwt.io/), we can translate this token and find out what information it holds:
       the payload is:
                {
                    "username": "admin",
                    "iat": 1658765047,
                    "sub": "a78e1e7e-da12-435f-901d-9edbd8ac849b"
                }
        */
       
    } catch (error) {
        next(error);
    }
        
})


export default authorizationRoute;