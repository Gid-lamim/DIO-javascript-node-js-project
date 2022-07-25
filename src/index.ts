import express, { NextFunction, Request, Response } from "express";
import basicAuthenticationMiddleware from "./middlewares/basic-authentication.middleware";
import bearerAuthenticationMiddleware from "./middlewares/bearer-authentication.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";

const app = express();

//basic setup for express
app.use(express.json()); //this will enable the code to understand json bodies
app.use(express.urlencoded({extended:true}));

//Routes imports
//app.use(basicAuthenticationMiddleware);
app.use(bearerAuthenticationMiddleware, userRoute); //this ensures that all user routes are authenticated. The access without a token is simply not allowed
app.use(statusRoute);
app.use(authorizationRoute);

//errorHandlers
app.use(errorHandler); //this will take care of all errors

app.listen(3000, ()=>{ // to access this:  http://localhost:3000
    console.log('porta 3000 ');
})
// this way, we can create a server very easily 