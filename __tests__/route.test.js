const { server } = require('../src/server.js');
const supertest = require('supertest');
const { db } = require('../src/models/index.js');
const mockRequest = supertest(server);

describe('API SERVER:', () => {
  
  beforeAll(async () => {
    await db.sync();
    await mockRequest.post('/cheese').send({ type: 'cheddar' })
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

  it('should get a single cheese', async () => {
    let results = await mockRequest.get('/cheese')
    let response = await mockRequest.get(`/cheese/${results.body[0].id}`)
    expect(response.status).toBe(200);
  })

  it('should update a single cheese', async () => {
    let results = await mockRequest.get('/cheese')
    let response = await mockRequest.put(`/cheese/${results.body[0].id}`).send({ type: 'mozzarella'})
    expect(response.status).toBe(202);
  })

  it('should delete a single cheese', async () => {
    let results = await mockRequest.get('/cheese')
    console.log("DELETE", results.body)
    let response = await mockRequest.delete(`/cheese/${results.body[0].id}`)
    expect(response.status).toEqual(204);
  })

})