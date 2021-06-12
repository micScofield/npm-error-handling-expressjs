import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    statusCode = 500
    reason = 'Error connecting to database'

    constructor() {
        super('Db error')

        //only because of typescript, we need to specify that we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype) 
    }

    serializeErrors = () => ([{ message: this.reason }])
}

