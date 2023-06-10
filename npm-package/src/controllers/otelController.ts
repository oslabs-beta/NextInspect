import { Request, Response, NextFunction } from 'express'
import { OtelData } from '../types/types'

type MainController = (req: Request, res: Response, next: NextFunction) => void
type HelperController = (req: Request, data: any) => {}

export interface OtelControllerType {
  parseAllRequest: MainController
  parseNodeRequest: HelperController
}


function unixNanoToMS(unixNano: number): number {
    const unixMS = Math.floor(unixNano / 1e6);
    return unixMS;
}


export const otelController: OtelControllerType = {
  parseAllRequest: (req: Request, res: Response, next: NextFunction) => {
    let data: OtelData = {}

    if (req.body.resourceSpans[0].scopeSpans[0].spans[0]?.traceId) {
        data.traceId = req.body.resourceSpans[0].scopeSpans[0].spans[0]?.traceId
      }
  
      if (req.body.resourceSpans[0].scopeSpans[0].spans[0]?.spanId) {
        data.spanId = req.body.resourceSpans[0].scopeSpans[0].spans[0]?.spanId
      }
  
      if (req.body.resourceSpans[0].resource.attributes[4]?.value?.stringValue) {
        data.applicationType = req.body.resourceSpans[0].resource.attributes[4].value.stringValue;
      }
  
      if (req.body.resourceSpans[0].resource?.attributes[0]?.value?.stringValue) {
        data.originatingService = req.body.resourceSpans[0].resource.attributes[0]?.value?.stringValue;
      }

      if (req.body.resourceSpans[0].scopeSpans[0]?.spans[0]?.name) {
        data.method = req.body.resourceSpans[0].scopeSpans[0].spans[0].name;
        data.name = req.body.resourceSpans[0].scopeSpans[0].spans[0].name;
      }

      

      const attributeArr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;
      for (let i = 0; i < attributeArr.length; i++) {
        if (attributeArr[i].key === 'http.status_code') data.status = attributeArr[i].value.intValue;
        if (attributeArr[i].key === 'http.flavor') data.protocol = attributeArr[i].value.stringValue;
        if (attributeArr[i].key === 'http.target') data.name = attributeArr[i].value.stringValue;
        if (attributeArr[i].key === 'http.request_content_length_uncompressed') data.size = attributeArr[i].value.intValue;
        if (attributeArr[i].key === 'http.method') data.method = attributeArr[i].value.stringValue;
      }
  
    // if (req.body.resourceSpans[0].resource.attributes[4]?.value?.stringValue === 'next.js') {
    //   data = otelController.parseNextJSRequest(req)
    // }   
    
    if (req.body.resourceSpans[0].resource.attributes[4]?.value?.stringValue === 'node.js') {
      data = otelController.parseNodeRequest(req, data);
    }
    data.startTime = unixNanoToMS(req.body.resourceSpans[0].scopeSpans[0].spans[0].startTimeUnixNano);
    // console.log(data);
    data.endTime = unixNanoToMS(req.body.resourceSpans[0].scopeSpans[0].spans[0].endTimeUnixNano);

    if (data.method === data.name) data.method = '';

    res.locals.telemetryData = data;

    return next()
  },

  parseNodeRequest: (req: Request, data: OtelData) => {
    const attributeArr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;
    const sizeAttribute = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[12];

    if (sizeAttribute?.key === 'size') {
        data.size = sizeAttribute.value.intValue;
    }

    const requestHeaders = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[0];
    if (requestHeaders?.key === 'request-headers') {
        let headers = JSON.parse(requestHeaders.value.stringValue);
        data.type = headers.accept.split(',')[0];
    }

    if (attributeArr[0]?.key === 'http.url') data.urlEndpoint = attributeArr[0]?.value?.stringValue;

    return data
  },
}