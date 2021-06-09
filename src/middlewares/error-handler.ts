import { Request, Response, NextFunction } from 'express'

import { CustomError } from '../errors/custom-error'

//follow same structure when throwing any error. { errors: [{ message: ... }] } is ensured using abstract class CustomError

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    return res.status(500).send({errors: [{ message: 'Something went wrong !!' }]})
}