import { otelController } from '../../controllers/otelController'
import { streamController } from '../../controllers/streamController'
import { Router, Request, Response, NextFunction } from 'express'

const streamRouter = Router()

streamRouter.get('/sse', (req: Request, res: Response) => {
  return res.status(200).json('Success')
})

streamRouter.post('/otel', (req: Request, res: Response) => {
  return res.status(200).json(req.body)
})

export default streamRouter
