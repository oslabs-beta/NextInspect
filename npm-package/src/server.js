"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var streamRouter_1 = require("./routers/streamRouter");
var PORT = 3002;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connect stream router
app.use('/stream', streamRouter_1.default);
// express general error handler
app.use(function (err, req, res, next) {
    var defaultError = {
        log: 'error at unknown middleware',
        code: 500,
        message: 'check error'
    };
    var newErr = Object.assign({}, defaultError, err);
    console.log(err);
    return res.status(newErr.code).json(newErr.message);
});
// connect to express port
app.listen(PORT, function () {
    console.log('NextInspect express npm package running on on port:' + PORT);
});
