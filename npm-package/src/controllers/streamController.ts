import { Request, Response, NextFunction } from 'express';
import { EventEmitter } from 'events';
import { OtelData } from '../types/types';
// If compression is desire, reinstall pako package
// import * as pako from 'pako';

const otelEventEmitter = new EventEmitter();
// let counter = 0;
export const streamController = {
    emitEvent: (req: Request, res: Response, next: NextFunction) => {
        // res.locals.telemetryData.forEach((metric: OtelData) => {
        //     otelEventEmitter.emit('newOtelEvent', metric);
        // })
        try {
            otelEventEmitter.emit('newOtelEvent', res.locals.telemetryData);
            return next();
        } catch(err) {
            return next(err);
        }
    },

    sendEvent: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('Access-Control-Allow-Origin', '*');

            otelEventEmitter.on('newOtelEvent', (data: OtelData) => {
                const jsonString = JSON.stringify(data);
                res.write(`data:` + `${jsonString}\n\n`)
                // I've left the encoding 
                // const uint8Array = new TextEncoder().encode(jsonString);
                // const compressedData = pako.gzip(uint8Array);
                // const compressedArray = Array.from(compressedData);
                // const base64Data = btoa(String.fromCharCode.apply(null, compressedArray));
                // const eventPayload = `data: ${base64Data}\n\n`;
                // res.write(eventPayload);
            })
        }
        catch(err) {
            return next(err);
        }
    }
}   