import express, { Express, NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';


const PORT: number = 3002;
const app: Express = express();

// connect to express port
app.listen(PORT, (): void => {
    console.log('NextInspect express npm package running on on port:' + PORT)
}).on("error", function(err) {
    //the listener is set up to listen for error events (ie. port already in use or inaccessible), callback function will execute
    console.log('error: ', err);
});