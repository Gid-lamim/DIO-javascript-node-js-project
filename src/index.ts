import express, {Request, Response, NextFunction}  from "express";

const app = express();

app.get('/status', (req: Request, res: Response, next: NextFunction)=>{
 res.status(200).send({foo: 'bar'});
});

app.listen(3000, ()=>{ // to access this:  http://localhost:3000
    console.log('porta 3000 ');
})
// this way, we can create a server very easily 