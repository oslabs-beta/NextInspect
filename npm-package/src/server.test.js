const request = require('supertest')
import app from './tests/mock app/mock-app'

//Testing for GET request to /sse route
describe('/stream-mock', () => {
  it('GET', async () => {
    const response = await request(app).get('/stream-mock/sse')
    expect(response.status).toBe(200)
    expect(response.body).toEqual('Success')
  })
})

//Request mock to test post route
const requestMock = {
  body: {
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
  },
}

//Testing for POST request to /otel route
describe('/otel', () => {
  it('POST', async () => {
    const response = await request(app)
      .post('/stream-mock/otel')
      .send(requestMock)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(requestMock)
  })
})
