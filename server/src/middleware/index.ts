import { get, merge } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { getUserBySessionToken } from '../db/users'
import { ObjectId } from 'mongoose'

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

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // verify account requested to be deleted is same as signed in user
        const currentUserId = (get(req, 'identity._id') as ObjectId).toString()

        if (!currentUserId) return res.sendStatus(400)

        if (currentUserId !== id) return res.sendStatus(403)

        next();

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}