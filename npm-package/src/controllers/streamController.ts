import { Request, Response, NextFunction } from 'express';
import { EventEmitter } from 'events';

const otelEventEmitter = new EventEmitter();

export const streamController = {
    emitEvent: (req: Request, res: Response) => {
        otelEventEmitter.emit('newOtelEvent', 'hello')
    },

    sendEvent: (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');

        otelEventEmitter.on('newOtelEvent', (data) => {
            res.write('data: ' + `${data}\n\n`)
        })
        // res.locals.metrics.forEach(((metric: any) => {
        //     res.write('data: ' + `${metric}\n\n`)
        // }))
    }
}