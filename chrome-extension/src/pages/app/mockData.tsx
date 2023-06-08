export interface IMockData{
  traceId: string,
  spanId: string,
  applicationType: string,
  originatingService: string,
  method: string,
  status?: number,
  protocol?: string,
  startTime: number,
  endTime: number,
  size?: number,
  type?: string,
  urlEndpoint?: string
}
export const mockData: IMockData[] = [
  {
    traceId: '40ed4f64f822fe9921975d324c66f32b',
    spanId: 'e554331a6c958ecc',
    applicationType: 'next.js',
    originatingService: 'next-app',
    method: 'PATCH',
    status: 201,
    protocol: '1.1',
    startTime: 1686105583108,
    endTime: 1686105583213
  },
  {
    traceId: '89da001044baf6247d23f76034e4d41a',
    spanId: '367a61faa913f665',
    applicationType: 'next.js',
    originatingService: 'next-app',
    method: 'GET',
    status: 200,
    protocol: '1.1',
    startTime: 1686105583254,
    endTime: 1686105583255
  },
  {
    traceId: '89da001044baf6247d23f76034e4d41a',
    spanId: '886df76bc277b4e8',
    applicationType: 'next.js',
    originatingService: 'next-app',
    method: 'GET /api/ramen/64792bc14e52c2c903b86b8e',
    status: 201,
    startTime: 1686105583243,
    endTime: 1686105583315
  },
  {
    traceId: 'c3915245672b2a5a3501db23f6c4cd49',
    spanId: '14ae32e64ce3b480',
    applicationType: 'node.js',
    originatingService: 'users-services',
    method: 'HTTP GET',
    status: 200,
    protocol: '1.1',
    urlEndpoint: 'http://localhost:8090/user',
    startTime: 1686105694664,
    endTime: 1686105694987
  },
  {
    traceId: 'c3915245672b2a5a3501db23f6c4cd49',
    spanId: '7c4422489da2db5a',
    applicationType: 'node.js',
    originatingService: 'users-services',
    method: 'GET /user',
    type: 'application/json',
    startTime: 1686105694666,
    endTime: 1686105694990
  }
]
