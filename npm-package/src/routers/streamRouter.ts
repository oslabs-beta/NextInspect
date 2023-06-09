import { otelController } from "../controllers/otelController";
import { streamController } from "../controllers/streamController";
import { Router, Request, Response } from 'express';

const streamRouter = Router();

streamRouter.get('/sse', streamController.sendEvent, (req: Request, res: Response) => {
})

streamRouter.get('/otel', otelController.parseAllRequest, streamController.emitEvent, (req: Request, res: Response) => {
    res.json('completed')
})

export default streamRouter;