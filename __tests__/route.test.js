const { server } = require('../src/server.js');
const supertest = require('supertest');
const { db } = require('../models/index.js');
const mockRequest = supertest(server);

describe('API SERVER:', () => {
  
  beforeAll(async () => {
    await db.sync();
    mockRequest.post('/cheese').send({ type: 'cheddar' })
  })

  afterAll(async () => {
    await db.drop();
  })

  it('should respond with a 404 if there is no route found', () => {
    return mockRequest.get('/404-route')
      .then(results => {
        expect(results.status).toBe(404);
      })
  })

  it('should create a new cheese', () => {
    mockRequest.post('/cheese').send({ type: 'brie' })
      .then(results => {
        expect(results.status).toBe(201);
      })
  })

  it('should get all cheeses', () => {
    mockRequest.get('/cheese')
      .then(results => {
        expect(results.status).toBe(200);
      })
  })

  it('should get a single cheese', () => {
    mockRequest.get('/cheese')
      .then(results => {
        mockRequest.get(`/cheese/${results.id}`);
      })
        .then(response => {
          expect(response.status).toBe(200);
        })
  })

  it('should update a single cheese', () => {
    mockRequest.get('/cheese')
      .then(results => {
        mockRequest.update(`/cheese/${results.id}`).send({ type: 'mozzarella'})
      })
        .then(response => {
          expect(response.status).toBe(202);
        })
  })

  it('should delete a single cheese', () => {
    mockRequest.get('/cheese')
      .then(results => {
        mockRequest.destroy(`/cheese/${results.id}`)
      })
        .then(response => {
          expect(response.status).toEqual(204);
        })
  })

})