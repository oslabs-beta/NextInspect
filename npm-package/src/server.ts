import express, { Express, NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import { DefaultError } from './types/types'
import streamRouter from './routers/streamRouter';

const PORT: number = 3002;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// connect stream router
app.use('/stream', streamRouter)

// express general error handler
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    const defaultError: DefaultError = {
        log: 'error at unknown middleware',
        code: 500,
        message: 'check error'
    }

    const newErr = Object.assign({}, defaultError, err);
    console.log('error:', newErr);
    return res.status(newErr.code).json(newErr.message);
});
// connect to express port
app.listen(PORT, (): void => {
    console.log('NextInspect express npm package running on on port:' + PORT)
}).on("error", function(err) {
    //the listener is set up to listen for error events (ie. port already in use or inaccessible), callback function will execute
    console.log('error: ', err);
});