// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
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