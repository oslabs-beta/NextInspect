const request = require('supertest')
import app from '../src/app'
import express, { Express, NextFunction, Request, Response, ErrorRequestHandler } from 'express';
const server = 'http://localhost:3002'
const EventSource = require('eventsource');
import {EventEmitter} from 'events'; 
import { streamController } from '../src/controllers/streamController'

//  describe('Express Routes', () => {
//      describe('/', () => {
//          it('GET', () => {
//              return request(server)
//                  .get('/')
//                  .expect(404)
//     })
//   })
// })


describe('/stream', () => {
//Mocking endpoint elements

it('should call middleware function', () => {

const mockSend = jest.fn()
streamController.sendEvent = mockSend; 

app.get('/stream/sse')
expect(streamController.sendEvent).toBeCalled()

})
})


//Attempt at utilizing EventEmitter and EventSource
//   let serverEvent, appEvent

// beforeEach(function (done) {
//   const emitter = new EventEmitter(); 
//   appEvent = express()
//   serverEvent = appEvent.listen(3000, done)
// })

// afterEach(function(done) {
//   serverEvent.close(done)
// })

// it ('should call the middleware function', (done) => { 
// const eventSource = new EventSource('http://localhost:3000/test')

// emitter.emit('test message', 1500)

// eventSource.addEventListener = ('test message', (data) => { 
// console.log(data)
// eventSource.close()
// done()
// })
// })



// //Request mock to test post route
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
                  { key: 'http.method', value: { stringValue: 'http method' } },
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

// //Testing for POST request to /otel route
describe('/otel', () => {
  it('POST', async () => {
    const response = await request(app)
      .post('/stream/otel')
      .send(requestMock)
    expect(response.body).toEqual('completed')
    expect(response.status).toBe(200)
  })
})
