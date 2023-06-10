import { Request, Response, NextFunction } from 'express';
import { EventEmitter } from 'events';
import { OtelData } from '../types/types';

const otelEventEmitter = new EventEmitter();
// let counter = 0;
export const streamController = {
    emitEvent: (req: Request, res: Response, next: NextFunction) => {
        // res.locals.telemetryData.forEach((metric: OtelData) => {
        //     otelEventEmitter.emit('newOtelEvent', metric);
        // })
        otelEventEmitter.emit('newOtelEvent', res.locals.telemetryData);
        return next();
    },

    sendEvent: (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        otelEventEmitter.on('newOtelEvent', (data: OtelData) => {
            // const dataString = Object.entries(data).map(([key, value]) => {

            // })
            // const sentData = `data: ${JSON.stringify(data)}\n\n`
            const sentData = `data: ${'hello'}\n\n`
            // counter++;
            // console.log(counter)
            setTimeout(()=> {
                res.write(sentData);
                console.log('new event')
            }, 1000)
            // res.send(sentData)
        })
    }
}