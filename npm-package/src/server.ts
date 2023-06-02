import express, { Express, NextFunction, Request, Response, ErrorRequestHandler } from 'express';

const PORT: number = 3000;

const app: Express = express();

app.use(express.json());
// express general error handler
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    const defaultError: DefaultError = {
        log: 'error at unknown middleware',
        code: 500,
        message: 'check error'
    }

    const newErr = Object.assign({}, defaultError, err);
    console.log(err);
    return res.status(newErr.code).json(newErr.message);
});

app.listen(PORT, (): void => {
    console.log('NextInspect express npm package running on on port:' + PORT)
});