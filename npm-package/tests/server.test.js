const request = require('supertest')
const server = 'http://localhost:3002'

describe('Express Routes', () => {
    describe('/', () => {
        it('GET', () => {
            const result = 2+2;
            expect(result).toEqual(4)
        })
    })
})