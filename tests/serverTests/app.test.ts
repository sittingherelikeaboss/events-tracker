import { describe, expect, test } from '@jest/globals';
import request from "supertest";
import app from '../../src/routes/app';
import { Event } from '../../src/interfaces/Event';
import { Metrics } from '../../src/interfaces/Metrics';

describe("Test app.ts", () => {
  let req: Event;
  let res: Metrics;

  beforeAll(() => {
    req = {
      "timestamp": "2024-05-04T05:57:46Z",
      "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
      "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
      "eventType": "SignIn"
    };
    res = {
      "counts": {
        "NewDevice": 0,
        "SignIn": 1,
        "CreateItem": 0,
        "DeleteItem": 0,
        "ViewItem": 0
      }
    };
  });


  describe('POST /events', () => {
    it('Events should return 200', async () => {
      const appRes = await request(app).post('/events').send(req);
      expect(appRes.status).toStrictEqual(200);
    });
    it('Events should return 400 for bad request with bad eventType', async () => {
      const reqWithTypo = {
        "timestamp": "2024-05-04T05:57:46Z",
        "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
        "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
        "eventType": "SignInn"
      };
      const appRes = await request(app).post('/events').send(reqWithTypo);
      expect(appRes.status).toStrictEqual(400);
    });
    it('Events should return 400 for bad request with missing field', async () => {
      const reqMissingField = {
        "timestamp": "2024-05-04T05:57:46Z",
        "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
        "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
      };
      const appRes = await request(app).post('/events').send(reqMissingField);
      expect(appRes.status).toStrictEqual(400);
    });
  });
  describe('GET /metrics', () => {
    it('Metrics should return 200', async () => {
      const appRes = await request(app).get('/metrics');
      expect(appRes.status).toStrictEqual(200);
      expect(appRes.body).toStrictEqual(res);
    });
    it('Metrics should go up when another Sign In event comes in', async () => {
      await request(app).post('/events').send(req);
      const appRes = await request(app).get('/metrics');
      res = {
        "counts": {
          "NewDevice": 0,
          "SignIn": 2,
          "CreateItem": 0,
          "DeleteItem": 0,
          "ViewItem": 0
        }
      };
      expect(appRes.status).toStrictEqual(200);
      expect(appRes.body).toStrictEqual(res);
    });
    it('Metrics should go up when another New Device event comes in', async () => {
      await request(app).post('/events').send({
        "timestamp": "2024-05-04T05:57:46Z",
        "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
        "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
        "eventType": "NewDevice"
      });
      const appRes = await request(app).get('/metrics');
      res = {
        "counts": {
          "NewDevice": 1,
          "SignIn": 2,
          "CreateItem": 0,
          "DeleteItem": 0,
          "ViewItem": 0
        }
      };
      expect(appRes.status).toStrictEqual(200);
      expect(appRes.body).toStrictEqual(res);
    });
  });
});
