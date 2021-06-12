import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
    statusCode = 400

    constructor(public message: string) {
        super('unprocessable entity 400') // or super(message)

        //only because of typescript, we need to specify that we are extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype) 
    }

    serializeErrors = () => ([{ message: this.message }])
}

