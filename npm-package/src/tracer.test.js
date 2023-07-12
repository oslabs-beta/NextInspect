import telemetryInitiation from './tracer'

//store result of invocation in tracer
const output = telemetryInitiation()
const traceComponents = output.tracer

describe('test TelemetryInitiation', () => {
  it('tracer function should return object type with some expected values', () => {
    expect(typeof output === 'object').toBe(true)
    expect(output).toHaveProperty('tracer')
    expect(traceComponents).toHaveProperty('_tracerProvider')
    expect(traceComponents).toHaveProperty('_sampler')
    expect(traceComponents).toHaveProperty('_generalLimits')
    expect(traceComponents).toHaveProperty('_spanLimits')
    expect(traceComponents).toHaveProperty('_idGenerator')
    expect(traceComponents).toHaveProperty('resource')
    expect(traceComponents).toHaveProperty('instrumentationLibrary')
  })
})
