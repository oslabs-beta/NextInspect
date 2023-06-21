"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var otelController_1 = require("../controllers/otelController");
var streamController_1 = require("../controllers/streamController");
var express_1 = require("express");
var streamRouter = (0, express_1.Router)();
streamRouter.get('/sse', streamController_1.streamController.sendEvent, function (req, res) {
});
streamRouter.post('/otel', otelController_1.otelController.parseAllRequest, streamController_1.streamController.emitEvent, function (req, res) {
    return res.json('completed');
});
exports.default = streamRouter;
