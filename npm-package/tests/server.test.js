const request = require('supertest')
const server = 'http://localhost:3002'

describe('Express Routes', () => {
    describe('/', () => {
        it('GET', () => {
            return request(server)
                .get('/')
                .expect(404)
        })
    })

    describe('/stream', () => {
        it('GET', () => {
          return request(server).get('/stream').expect(404)
        })
      })
    })
