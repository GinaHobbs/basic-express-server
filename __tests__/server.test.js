const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('API SERVER:', () => {
  it('should respond with a 404 if there is no route found', () => {
    return mockRequest.get('/404-route')
      .then(results => {
        expect(results.status).toBe(404);
      })
  })

  it('should respond with a 500 if there is an internal server error', () => {
    return mockRequest.get('/500-route')
      .then(results => {
        expect(results.status).toBe(500);
      })
  })

  it('should respond with a 200 if the name is in the query string', () => {
    return mockRequest.get('/person?name=Fred')
      .then(results => {
        expect(results.status).toBe(200)
      })
  })

  it('should respond with a 500 if the name is not in the query string',() => {
    return mockRequest.get('/person')
      .then(results => {
        expect(results.status).toBe(500)
      })
  })

  it('should respond with JSON data if the name is in the query string', () => {
    return mockRequest.get('/person?name=Fred')
      .then(results => {
        const expected = { name: "Fred" }
        expect(results.req.data).toMatchObject(expected)
      })
  })
})