import { otelController } from './otelController'

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

//OtelData mock
const data = { size: 0 }

//Time function
function unixNanoToMS(unixNano) {
  const unixMS = Math.floor(unixNano / 1e6)
  return unixMS
}

//Mock middleware to test parseAllRequest logic
const parseRequest = (req) => {
  let data = {}

  if (req.body.resourceSpans[0].scopeSpans[0].spans[0]?.traceId) {
    data.traceId = req.body.resourceSpans[0].scopeSpans[0].spans[0]?.traceId
  }

  if (req.body.resourceSpans[0].scopeSpans[0].spans[0]?.spanId) {
    data.spanId = req.body.resourceSpans[0].scopeSpans[0].spans[0]?.spanId
  }

  if (req.body.resourceSpans[0].resource.attributes[4]?.value?.stringValue) {
    data.applicationType =
      req.body.resourceSpans[0].resource.attributes[4].value.stringValue
  }

  if (req.body.resourceSpans[0].resource?.attributes[0]?.value?.stringValue) {
    data.originatingService =
      req.body.resourceSpans[0].resource.attributes[0]?.value?.stringValue
  }

  if (req.body.resourceSpans[0].scopeSpans[0]?.spans[0]?.name) {
    data.method = req.body.resourceSpans[0].scopeSpans[0].spans[0].name
    data.name = req.body.resourceSpans[0].scopeSpans[0].spans[0].name
  }

  const attributeArr =
    req.body.resourceSpans[0].scopeSpans[0].spans[0].attributes
  for (let i = 0; i < attributeArr.length; i++) {
    if (attributeArr[i].key === 'http.status_code')
      data.status = attributeArr[i].value.intValue
    if (attributeArr[i].key === 'http.flavor')
      data.protocol = attributeArr[i].value.stringValue
    if (attributeArr[i].key === 'http.target')
      data.name = attributeArr[i].value.stringValue
    if (attributeArr[i].key === 'http.request_content_length_uncompressed')
      data.size = attributeArr[i].value.intValue
    if (attributeArr[i].key === 'http.method')
      data.method = attributeArr[i].value.stringValue
  }
  data.startTime = unixNanoToMS(
    req.body.resourceSpans[0].scopeSpans[0].spans[0].startTimeUnixNano,
  )
  // console.log(data);
  data.endTime = unixNanoToMS(
    req.body.resourceSpans[0].scopeSpans[0].spans[0].endTimeUnixNano,
  )

  if (data.method === data.name) data.method = ''
  return data
}

//Unit Test - Testing Methods' Functionality
describe('otelController method testing', () => {
  describe('parseAllRequest testing', () => {
    it('next function should be called', async () => {
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
    it('next function should be called with node request', async () => {
      await otelController.parseNodeRequest(nodeRequestMock, data)
      expect(data.size).toEqual(15)
    })
  })
})

//Unit Test - Testing Data Format/Values
describe('otelController data testing', () => {
  test('test data formats for parseAllRequest method', () => {
    const networkData = parseRequest(requestMock)
    expect(typeof networkData.traceId).toEqual('number')
    expect(typeof networkData.spanId).toEqual('number')
    expect(typeof networkData.applicationType).toEqual('string')
    expect(typeof networkData.originatingService).toEqual('string')
    expect(typeof networkData.method).toEqual('string')
    expect(typeof networkData.name).toEqual('string')
    expect(typeof networkData.status).toEqual('number')
    expect(typeof networkData.protocol).toEqual('string')
    expect(typeof networkData.size).toEqual('number')
    expect(typeof networkData.startTime).toEqual('number')
    expect(typeof networkData.endTime).toEqual('number')
  })
  test('test data values for parseAllRequest method', () => {
    const networkData = parseRequest(requestMock)
    expect(networkData.traceId).toEqual(1)
    expect(networkData.spanId).toEqual(5)
    expect(networkData.applicationType).toEqual('internet')
    expect(networkData.originatingService).toEqual('nextJs')
    expect(networkData.method).toEqual('http method')
    expect(networkData.name).toEqual('target')
    expect(networkData.status).toEqual(505)
    expect(networkData.protocol).toEqual('flavor')
    expect(networkData.size).toEqual(155)
    expect(networkData.startTime).toEqual(0)
    expect(networkData.endTime).toEqual(0)
  })
})
