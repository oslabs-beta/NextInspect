"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otelController = void 0;
function unixNanoToMS(unixNano) {
    var unixMS = Math.floor(unixNano / 1e6);
    return unixMS;
}
exports.otelController = {
    parseAllRequest: function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var data = {};
        if ((_a = req.body.resourceSpans[0].scopeSpans[0].spans[0]) === null || _a === void 0 ? void 0 : _a.traceId) {
            data.traceId = (_b = req.body.resourceSpans[0].scopeSpans[0].spans[0]) === null || _b === void 0 ? void 0 : _b.traceId;
        }
        if ((_c = req.body.resourceSpans[0].scopeSpans[0].spans[0]) === null || _c === void 0 ? void 0 : _c.spanId) {
            data.spanId = (_d = req.body.resourceSpans[0].scopeSpans[0].spans[0]) === null || _d === void 0 ? void 0 : _d.spanId;
        }
        if ((_f = (_e = req.body.resourceSpans[0].resource.attributes[4]) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.stringValue) {
            data.applicationType = req.body.resourceSpans[0].resource.attributes[4].value.stringValue;
        }
        if ((_j = (_h = (_g = req.body.resourceSpans[0].resource) === null || _g === void 0 ? void 0 : _g.attributes[0]) === null || _h === void 0 ? void 0 : _h.value) === null || _j === void 0 ? void 0 : _j.stringValue) {
            data.originatingService = (_l = (_k = req.body.resourceSpans[0].resource.attributes[0]) === null || _k === void 0 ? void 0 : _k.value) === null || _l === void 0 ? void 0 : _l.stringValue;
        }
        if ((_o = (_m = req.body.resourceSpans[0].scopeSpans[0]) === null || _m === void 0 ? void 0 : _m.spans[0]) === null || _o === void 0 ? void 0 : _o.name) {
            data.method = req.body.resourceSpans[0].scopeSpans[0].spans[0].name;
            data.name = req.body.resourceSpans[0].scopeSpans[0].spans[0].name;
        }
        var attributeArr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;
        for (var i = 0; i < attributeArr.length; i++) {
            if (attributeArr[i].key === 'http.status_code')
                data.status = attributeArr[i].value.intValue;
            if (attributeArr[i].key === 'http.flavor')
                data.protocol = attributeArr[i].value.stringValue;
            if (attributeArr[i].key === 'http.target')
                data.name = attributeArr[i].value.stringValue;
            if (attributeArr[i].key === 'http.request_content_length_uncompressed')
                data.size = attributeArr[i].value.intValue;
            if (attributeArr[i].key === 'http.method')
                data.method = attributeArr[i].value.stringValue;
        }
        // if (req.body.resourceSpans[0].resource.attributes[4]?.value?.stringValue === 'next.js') {
        //   data = otelController.parseNextJSRequest(req)
        // }   
        if (((_q = (_p = req.body.resourceSpans[0].resource.attributes[4]) === null || _p === void 0 ? void 0 : _p.value) === null || _q === void 0 ? void 0 : _q.stringValue) === 'node.js') {
            data = exports.otelController.parseNodeRequest(req, data);
        }
        data.startTime = unixNanoToMS(req.body.resourceSpans[0].scopeSpans[0].spans[0].startTimeUnixNano);
        // console.log(data);
        data.endTime = unixNanoToMS(req.body.resourceSpans[0].scopeSpans[0].spans[0].endTimeUnixNano);
        if (data.method === data.name)
            data.method = '';
        res.locals.telemetryData = data;
        return next();
    },
    parseNodeRequest: function (req, data) {
        var _a, _b, _c;
        var attributeArr = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes;
        var sizeAttribute = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[12];
        if ((sizeAttribute === null || sizeAttribute === void 0 ? void 0 : sizeAttribute.key) === 'size') {
            data.size = sizeAttribute.value.intValue;
        }
        var requestHeaders = req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes[0];
        if ((requestHeaders === null || requestHeaders === void 0 ? void 0 : requestHeaders.key) === 'request-headers') {
            var headers = JSON.parse(requestHeaders.value.stringValue);
            data.type = headers.accept.split(',')[0];
        }
        if (((_a = attributeArr[0]) === null || _a === void 0 ? void 0 : _a.key) === 'http.url')
            data.urlEndpoint = (_c = (_b = attributeArr[0]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.stringValue;
        return data;
    },
};
