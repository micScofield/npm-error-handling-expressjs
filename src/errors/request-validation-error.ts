import { ValidationError } from 'express-validator'

import { CustomError } from './custom-error'

/*we need extra check in serialize error method so that right properties are returned and we do not make typos. So we can create: 
    (a) interface of this class. Our class can say implements customError. Interfaces dont exist in javascript so it is in dev mode only. So inside other classes, we need to have checks of instanceof like we did inside error handler middleware.
    (b) Create an abstract class (Used to setup requirements for setup class). Extend abstract class instead of Error now. So, Better approach and no need to write if checks for all types of instances. JS supports it as well
*/
   
/*
interface customError {
    statusCode: number,
    serializeErrors(): {
        message: string,
        field?: string //optional field
    }[]
}
*/

export class RequestValidationError extends CustomError{
    /*
    errors: ValidationError[]
    constructor(errors: ValidationError[]) {
        super()
        this.errors = errors
    } 
    is equivalent of below:
    constructor(public errors: ValidationError[]) {
        super()
    }
    */
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        //passing a string to super means that if we throw using default Error class, like for logging purposes inside app, we can pass them like this. super() means reaching out to Error class itself.
        super('Error connecting to db') 

        //only because of typescript, we need to specify that we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype) 
    }

    serializeErrors = () => this.errors.map(error => ({ message: error.msg, field: error.param }))
}

