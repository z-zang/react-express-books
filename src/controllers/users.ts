import { deleteUserById, getUserById, getUsers, updateUserById } from "../db/users";
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

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id)
        if (!deletedUser) return res.sendStatus(400)

        return res.status(200).json(deletedUser)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id)
        if (!user) return res.sendStatus(403)

        const { email, password, username } = req.body
        if (!email && !password && !username) return res.sendStatus(403)

        const updatedUser = await updateUserById(id, { password, email, username })

        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}