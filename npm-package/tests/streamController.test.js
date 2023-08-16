import { streamController } from '../src/controllers/streamController'
import { EventEmitter } from 'events'

//Mock Request, Response and Next Functions
const requestMock = { body: 'body' }
const responseMock = { status: 200, locals: { telemetryData: 'test' } }
const responseMockTwo = { status: 200, locals: {} }
const nextMock = jest.fn()

//import methods from Stream Controller
const emitFunction = streamController.emitEvent
const sendFunction = streamController.sendEvent

//Mock controller methods to test innner
const mockEmitter = new EventEmitter()
const res = {
  setHeader: jest.fn(),
  locals: { telemetryData: 1 },
  write: jest.fn(),
}
//Mocked emitter event to test functionality of inner functions
mockEmitter.emit = jest.fn()

mockEmitter.on = () => {
  'newOtelEvent',
    () => {
      const jsonString = JSON.stringify(data)
      res.write(`data:` + `${jsonString}\n\n`)
    }
}

// const spy = jest.spyOn(emitFunction, 'emit')
// const spyTwo = jest.spyOn(streamController.sendEvent, 'on')

//TESTS
describe('streamController method testing', () => {
  describe('emitEvent testing', () => {
    test('next function should be called', async () => {
      await emitFunction(requestMock, responseMock, nextMock)
      expect(nextMock).toBeCalled()
    })
    test('should execute emit function', () => {
      mockEmitter.emit(requestMock, responseMock, nextMock)
    })
  })

  describe('sendEvent testing', () => {
    test('sendEvent initializes and calls appropriately', async () => {
      const result = await sendFunction(requestMock, res, nextMock)
      expect(res.setHeader).toBeCalled()
      expect(res.setHeader).toBeCalledTimes(4)
    })
  })
})
