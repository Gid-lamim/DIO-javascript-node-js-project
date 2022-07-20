import { query } from "express";
import User from "../models/user.model";
import db from "../routes/db";


class UserRepository{
    
    async findAllUser (): Promise<User[]> {
        const sqlQuery = `
            SELECT username, uuid 
            FROM application_user
        `;
        
    const {rows} = await db.query<User>(sqlQuery);
    
    return rows || [];
    }

    //function takes the string id as a parameter and returns a promise
     async findByUuid (uuid: string): Promise<User> {
        const query = `
            SELECT username, uuid 
            FROM application_user 
            WHERE uuid = $1
        `;

        //the $1 sign allows us to pass a variable into the sql query.
        /*if I don't do it, I allow whats called sql injection:
        
            SQL injection is a code injection technique that might destroy your database.

            SQL injection is one of the most common web hacking techniques.

            SQL injection is the placement of malicious code in SQL statements, via web page input.?
        */

        const values = [uuid];

        const {rows} = await db.query<User>(query, values);
        
        const [ user ] = rows;
        //   const [ user ] = rows;   -->    is the same as    -->    const user = rows;       that's called array deestructuring

        return user;

    }
}

export default new UserRepository;