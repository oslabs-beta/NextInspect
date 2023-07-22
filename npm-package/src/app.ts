// import express, { Express, NextFunction, Request, Response, ErrorRequestHandler } from 'express';
// import cors from 'cors';
// import { DefaultError } from './types/types'
// import streamRouter from './routers/streamRouter';

// const app: Express = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// // connect stream router
// app.use('/stream', streamRouter)

// // express general error handler
// app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//     const defaultError: DefaultError = {
//         log: 'error at unknown middleware',
//         code: 500,
//         message: 'check error'
//     }

//     const newErr = Object.assign({}, defaultError, err);
//     console.log('error:', newErr);
//     return res.status(newErr.code).json(newErr.message);
// });

// export default app;
