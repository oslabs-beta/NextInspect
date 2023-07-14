import { otelController } from '../src/controllers/otelController.ts'

//create mock jest function to serve as next() function
const nextMock = jest.fn()

//Request mock
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

//Node Request Mock
const nodeRequestMock = {
  body: {
    resourceSpans: [
      {
        scopeSpans: [
          {
            spans: [
              {
                traceID: 1,
                attributes: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 10 },
                  { value: 11 },
                  { key: 'size', value: { intValue: 15 } },
                ],
              },
            ],
          },
        ],
        resource: {
          attributes: [
            { value: 0 },
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: { stringValue: 'node.js' } },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 10 },
            { value: 11 },
            { key: 1 },
          ],
        },
      },
    ],
  },
}

//Response mock
const responseMock = { status: 200, locals: { telemetryData: 'test' } }

//OtelData mock (for parsenodeRequest test)
const data = { size: 0 }



//Unit Test - Testing Methods' Functionality
describe('otelController method testing', () => {
  describe('parseAllRequest testing', () => {
    it('test parseAllRequest functionality', async() => { 

    // let response = httpMocks.createResponse(); 
    await otelController.parseAllRequest(requestMock, responseMock, nextMock)
    expect(responseMock.locals.telemetryData.traceId).toEqual(1)
    expect(responseMock.locals.telemetryData.spanId).toEqual(5)
    expect(responseMock.locals.telemetryData.applicationType).toEqual('internet')
    expect(responseMock.locals.telemetryData.originatingService).toEqual('nextJs')
    expect(responseMock.locals.telemetryData.method).toEqual('http method')
    expect(responseMock.locals.telemetryData.name).toEqual('target')
    expect(responseMock.locals.telemetryData.status).toEqual(505)
    expect(responseMock.locals.telemetryData.protocol).toEqual('flavor')
    expect(responseMock.locals.telemetryData.size).toEqual(155)
    expect(responseMock.locals.telemetryData.startTime).toEqual(0)
    expect(responseMock.locals.telemetryData.endTime).toEqual(0)
    })

    it('next function should be called in Parse All Request', async () => {
      await otelController.parseAllRequest(requestMock, responseMock, nextMock)
      expect(nextMock).toBeCalled()
    })
  })

  describe('parseNodeRequest testing', () => {
    it('next function should be called with node request', async () => {
      await otelController.parseAllRequest(
        nodeRequestMock,
        responseMock,
        nextMock,
      )
      expect(nextMock).toBeCalled()
    })
    it('returned data should match the mocked noderequest', async () => {
      await otelController.parseNodeRequest(nodeRequestMock, data)
      expect(data.size).toEqual(15)
    })
  })
})
