import { Request, Response, NextFunction, RequestHandler } from 'express';

interface OtelController {
    parseAllRequest: RequestHandler,
    parseNodeRequest: RequestHandler,
    parseNextJSRequest: RequestHandler
}

export const otelController: OtelController = {
    parseAllRequest : (req: Request, res: Response, next: NextFunction) => {
        //need to diffrentiate between nextJS and Node application since parsing of the data is different

    },
    parseNextJSRequest : (req: Request, res: Response, next: NextFunction) => {

    },
    parseNodeRequest : (req: Request, res: Response, next: NextFunction) => {

    } 
};

// this is the disparate code to access the data: 
// how to get the originiating service
//   console.log('originating service', req.body.resourceSpans[0].resource.attributes[0].value.stringValue);

// originating application type
// node.js backend
//  console.log('application type', req.body.resourceSpans[0].resource.attributes[1].value.stringValue);
//next js
//  console.log('originating application type', req.body.resourceSpans[0].scopeSpans[0].scope.name);


//'Execution type/method'
//node.js
//  console.log('Execution type', req.body.resourceSpans[0].scopeSpans[0].spans[0].name);
//next.js
// console.log('execution type/next route/next page', req.body.resourceSpans[0].scopeSpans[0].spans[0].name);


//status
//both
// let curr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;

// for (let i = 0; i < curr.length; i++) {
//     if (curr[i].key === 'http.status_code') console.log(curr[i].value.intValue);
// }

//start and end time 
//both
//  console.log('start', req.body.resourceSpans[0].scopeSpans[0].spans[0].startTimeUnixNano);
//  console.log('end', req.body.resourceSpans[0].scopeSpans[0].spans[0].endTimeUnixNano);


//protocol
//next.js
// let httpArray =  req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;
// let protocolString = '';

// for (let i = 0; i < httpArray.length; i++) {
//   if (httpArray[i].key === 'http.scheme') protocolString += httpArray[i].value.stringValue += ' ';
//   if (httpArray[i].key === 'http.flavor') protocolString += httpArray[i].value.stringValue;
// }
// console.log(protocolString);

//node.js
//url 
//protocol string 
// let httpArray =  req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;
// console.log('main', httpArray)
// let protocolString = ``;
// let url = '';
// if (httpArray[0].key === 'http.url') url = httpArray[0].value.stringValue;
// for (let i = 0; i < httpArray.length; i++) {
//   if (httpArray[i].key === 'http.url') protocolString += req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[0].key += ' '
//   if (httpArray[i].key === 'http.flavor') protocolString += httpArray[i].value.stringValue;
// }
// console.log('url', url);
// console.log('protocol String', protocolString);


//size
//node.js
// console.log('size', req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[7]);
// let attributeArr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[7]
// let size = 0;
// if (attributeArr?.key === 'http.response_content_length_uncompressed') {
//     size = attributeArr.value.intValue;
// }

// console.log('size', size);

//type
// console.log('type', req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[0]);
// let typeArr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[0];
// // JSON.parse(typeArr);
// let headers;
// if (typeArr?.key === 'request-headers') {
//     headers = JSON.parse(typeArr.value.stringValue);
// }

// console.log(headers?.accept);


module.exports = otelController;