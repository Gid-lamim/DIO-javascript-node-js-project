import express, {Request, Response, NextFunction}  from "express";
import userRoute from "./routes/users.route";

const app = express();

//basic setup for express
app.use(express.json()); //this will enable the code to understand json bodies
app.use(express.urlencoded({extended:true}));

app.use(userRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction)=>{
 res.status(200).send({foo: 'bar'});
});

app.listen(3000, ()=>{ // to access this:  http://localhost:3000
    console.log('porta 3000 ');
})
// this way, we can create a server very easily 