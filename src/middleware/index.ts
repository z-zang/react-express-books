import { get, merge } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { getUserBySessionToken } from '../db/users'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['goodreads-session']
        if (!sessionToken) return res.sendStatus(403)

        const existingUser = await getUserBySessionToken(sessionToken)
        if (!existingUser) return res.sendStatus(403)

        // adds identity to req obj ?
        merge(req, { identity: existingUser })

        return next();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}