import express, { Express, NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import { otelController } from './controllers/otelController';
import { DefaultError } from '../types/server'

const PORT: number = 3002;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', otelController.parseAllRequest, (req, res) => {
    //set up sending data to the front end here
    res.sendStatus(200);
})

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

export default app