import { query } from "express";
import User from "../models/user.model";
import db from "../routes/db";


class UserRepository{
    
    async findAllUser (): Promise<User[]> {
        const sqlQuery = `
            SELECT username, uuid 
            FROM application_user
        `;
        
    const result = await db.query<User>(sqlQuery);
    
    const rows = result.rows;

    return rows || [];
    }
}

export default new UserRepository;