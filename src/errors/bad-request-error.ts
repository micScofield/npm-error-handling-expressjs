import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
    statusCode = 422

    constructor(public message: string) {
        super('unprocessable entity 422') // or super(message)

        //only because of typescript, we need to specify that we are extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype) 
    }

    serializeErrors = () => ([{ message: this.message }])
}

