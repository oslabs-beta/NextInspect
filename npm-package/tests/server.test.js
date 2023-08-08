const request = require('supertest')
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
  response,
} from 'express'
const server = 'http://localhost:3002'

describe('Express Routes', () => {
  describe('/', () => {
    it('GET', () => {
      return request(server).get('/').expect(404)
    })
  })

  describe('/otel', () => {
    it('POST requests return a response with status 200 and completed in body', async () => {
      const requestMock = {
        resourceSpans: [
          {
            scopeSpans: [
              {
                spans: [
                  {
                    traceId: 1,
                    attributes: [
                      { value: 1 },
                      { value: 2 },
                      { value: 3 },
                      { key: 'http.status_code', value: { intValue: 505 } },
                      { key: 'http.flavor', value: { stringValue: 'flavor' } },
                      { key: 'http.target', value: { stringValue: 'target' } },
                      {
                        key: 'http.method',
                        value: { stringValue: 'http method' },
                      },
                      {
                        key: 'http.request_content_length_uncompressed',
                        value: { intValue: 155 },
                      },
                    ],
                    spanId: 5,
                    name: 'method name',
                    startTimeUnixNano: 15,
                    endTimeUnixNano: 24,
                  },
                ],
              },
            ],
            resource: {
              attributes: [
                { value: { stringValue: 'nextJs' } },
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: { stringValue: 'internet' } },
                { value: 5 },
                { value: 6 },
                { value: 7 },
                { value: 8 },
                { value: 9 },
                { value: 10 },
                { value: 11 },
                { value: 12 },
              ],
            },
          },
        ],
      }
      const response = await request(server)
        .post('/stream/otel')
        .send(requestMock)
      expect(response.body).toEqual('completed')
      expect(response.status).toBe(200)
    })
  })
})
