"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamController = void 0;
var events_1 = require("events");
// If compression is desire, reinstall pako package
// import * as pako from 'pako';
var otelEventEmitter = new events_1.EventEmitter();
// let counter = 0;
exports.streamController = {
    emitEvent: function (req, res, next) {
        // res.locals.telemetryData.forEach((metric: OtelData) => {
        //     otelEventEmitter.emit('newOtelEvent', metric);
        // })
        otelEventEmitter.emit('newOtelEvent', res.locals.telemetryData);
        return next();
    },
    sendEvent: function (req, res, next) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        otelEventEmitter.on('newOtelEvent', function (data) {
            var jsonString = JSON.stringify(data);
            res.write("data:" + "".concat(jsonString, "\n\n"));
            // I've left the encoding 
            // const uint8Array = new TextEncoder().encode(jsonString);
            // const compressedData = pako.gzip(uint8Array);
            // const compressedArray = Array.from(compressedData);
            // const base64Data = btoa(String.fromCharCode.apply(null, compressedArray));
            // const eventPayload = `data: ${base64Data}\n\n`;
            // res.write(eventPayload);
        });
    }
};
