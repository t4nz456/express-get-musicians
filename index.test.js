// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('musicians endpoint', () => {
    test('It should respond with an array of musicians and status code 200', async () => {
      const response = await request(app).get('/musicians');
      expect(response.statusCode).toBe(200);
      const musicians = JSON.parse(response.text);
      expect(Array.isArray(musicians)).toBe(true);
      expect(musicians.length).toBeGreaterThan(0);
    });
  
});

describe("Musicians Endpoints", () => {
  let musicianId;

  it("should create a new musician", async () => {
    const res = await request(app)
      .post("/musicians")
      .send({
        name: "John Doe",
        instrument: "Guitar",
        genre: "Rock"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("John Doe");
    expect(res.body.instrument).toEqual("Guitar");
    expect(res.body.genre).toEqual("Rock");
    musicianId = res.body.id;
  });

  it("should return all musicians", async () => {
    const res = await request(app).get("/musicians");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update an existing musician", async () => {
    const res = await request(app)
      .put(`/musicians/${musicianId}`)
      .send({
        name: "Jane Doe",
        instrument: "Piano",
        genre: "Jazz"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toEqual(1);
  });

  it("should delete an existing musician", async () => {
    const res = await request(app).delete(`/musicians/${musicianId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(1); 
  });
});

describe('GET /musicians', () => {
  it('should return all musicians', async () => {
    const response = await request(app).get('/musicians');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('should return a specific musician by id', async () => {
    const response = await request(app).get('/musicians/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', 'John Doe');
    expect(response.body).toHaveProperty('instrument', 'guitar');
  });
  
  it('should return 404 if musician is not found', async () => {
    const response = await request(app).get('/musicians/999');
    expect(response.status).toBe(404);
  });
});

const request = require('supertest');
const app = require('../app');

describe('Test the musician API', () => {

  let musicianId;

  it('should GET all musicians', async () => {
    const response = await request(app).get('/musicians');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should POST a new musician', async () => {
    const newMusician = {
      name: 'John Doe',
      genre: 'Rock'
    };
    const response = await request(app).post('/musicians').send(newMusician);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(newMusician.name);
    expect(response.body.genre).toBe(newMusician.genre);
    musicianId = response.body.id;
  });

  it('should GET a musician by id', async () => {
    const response = await request(app).get(`/musicians/${musicianId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBeDefined();
    expect(response.body.genre).toBeDefined();
  });

  it('should PUT a musician by id', async () => {
    const updatedMusician = {
      name: 'Jane Doe',
      genre: 'Pop'
    };
    const response = await request(app).put(`/musicians/${musicianId}`).send(updatedMusician);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(1);
  });

  it('should DELETE a musician by id', async () => {
    const response = await request(app).delete(`/musicians/${musicianId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(1);
  });

});

describe('GET /bands', () => {
  beforeAll(async () => {
    await Band.create({ name: 'Band 1' });
    await Band.create({ name: 'Band 2' });
  });

  afterAll(async () => {
    await Band.destroy({ where: {} });
  });

  it('should return an array of bands with musicians', async () => {
    const response = await request(app).get('/api/bands');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Band 1');
    expect(response.body[0].Musicians).toBeDefined();
  });
});

describe('GET /bands/:id', () => {
  let bandId;

  beforeAll(async () => {
    const band = await Band.create({ name: 'Band 1' });
    bandId = band.id;
    await Musician.create({ name: 'Musician 1', BandId: bandId });
  });

  afterAll(async () => {
    await Band.destroy({ where: {} });
  });

  it('should return a band with musicians', async () => {
    const response = await request(app).get(`/api/bands/${bandId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Band 1');
    expect(response.body.Musicians.length).toBe(1);
    expect(response.body.Musicians[0].name).toBe('Musician 1');
  });
});


