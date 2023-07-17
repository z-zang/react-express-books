import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.sendStatus(400);

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) return res.sendStatus(400);

        // authenticate user without exposing sensitive information
        const expectedHash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedHash) {
            res.sendStatus(403)
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()

        res.cookie('goodreads-session', user.authentication.sessionToken, {
            domain: process.env.DOMAIN || 'localhost',
            path: '/'
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body

        if (!email || !password || !username) return res.sendStatus(400);

        const existingUser = await getUserByEmail(email);

        if (existingUser) return res.sendStatus(400);

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}