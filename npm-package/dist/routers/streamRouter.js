"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const otelController_1 = require("../controllers/otelController");
const streamController_1 = require("../controllers/streamController");
const express_1 = require("express");
const streamRouter = (0, express_1.Router)();
streamRouter.get('/sse', streamController_1.streamController.sendEvent, (req, res) => {
});
streamRouter.post('/otel', otelController_1.otelController.parseAllRequest, streamController_1.streamController.emitEvent, (req, res) => {
    return res.json('completed');
});
exports.default = streamRouter;
