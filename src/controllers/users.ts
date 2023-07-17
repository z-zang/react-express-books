import { getUsers } from "../db/users";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

