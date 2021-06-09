import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
    statusCode = 404
    reason = 'Route not found'

    constructor() {
        super('Route not found 404')

        //only because of typescript, we need to specify that we are extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype) 
    }

    serializeErrors = () => ([{ message: this.reason }])
}

