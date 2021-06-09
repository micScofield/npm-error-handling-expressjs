This package offers an error handling mechnanism for express.js applications. The underlying code is written in TypeScript.

Some error elasses are defined which extend an astract error class (Custom Error Class):
IMP NOTE: To use these classes, make sure to add errorHandler middleware after specifying all routes inside the app.js file (or any entry file) 
eg: app.use(errorHandler)

export abstract class CustomError extends Error {
    abstract statusCode: number

    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract serializeErrors(): {
        message: string,
        field?: string
    }[]
}

This forces us to maintain the structure of error messages which then becomes crucial in handling them inside front end application. We dont need to worry about error formatting there as we are always sending a statuscode and an object array as errors. Typescript ensures this management inside express js if used.

Error Classes: 

1. RequestValidationError (400): requires the error array (given by express validator) to be passed when throwing this type of error: for example: 
throw new RequestValidationError(errors.array());

See middleware section below to automate this as well.


2. DatabaseConnectionError (500): Does not require any argument to be passed, a standard error message will be set by default.
eg: throw new DatabaseConnectionError()


3. NotAuthorizedError (401): Does not require any argument to be passed, a standard error message will be set by default.


4. NotFoundError (404): Does not require any argument to be passed, a standard error message will be set by default.

// Use below snippet after specifying all routes in the main entry file:

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})


5. BadRequestError (422): A message needs to be passed to let user know what exactly is unprocessable entity here.
eg: throw new BadRequestError('Invalid Credentials')


Middlewares:
1. errorHandler: Key to use for using above mentioned error classes to their fullest potential.

2. validateRequest:
In above section, we mentioned an automation part of error handling using express-validator, simply pass this middleware as next argument after writing the validation checks. All error handling and throwing will be managed automatically.

Example:
router.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {}
)

// the middleware will appropriately send the errors to the frontend which can be handled using try catch mechanisms etc.

3A. currentUser:
More often than not, upon refresh on a page, we make an api call using useEffect to fetch current user details so as to maintain that user inside our state (if using react app). This middleware expects a jwt token to be sent along with request inside a cookie, then it can set current user on the request object which then can be returned in the router controller method.

eg:
router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null })
})

3B. requireAuth:
For route protection, this is a layer of security which checks for a req.currentUser property, if it is not null, the route access is enabled for the user.

