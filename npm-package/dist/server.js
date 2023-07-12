"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const streamRouter_1 = __importDefault(require("./routers/streamRouter"));
const PORT = 3002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/stream', streamRouter_1.default);
app.use((err, req, res, next) => {
    const defaultError = {
        log: 'error at unknown middleware',
        code: 500,
        message: 'check error'
    };
    const newErr = Object.assign({}, defaultError, err);
    console.log(err);
    return res.status(newErr.code).json(newErr.message);
});
app.listen(PORT, () => {
    console.log("NextInspect express npm package running on port: " + PORT);
});
exports.default = app;
