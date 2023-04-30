import app from '../app';
import request from 'supertest';
import { type TCoin, type TCoinSingle } from '../types/coin.type';

// This is the rest API sends the same data that the websocket but all assets. Only for test and debug agility
describe('GET /price', () => {
  const route = '/price';
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).get(route).send();
    expect(response.statusCode).toBe(200);
  });
  test('Should respond with a type of application/json', async () => {
    const response = await request(app).get(route).send();
    expect(response.type).toEqual('application/json');
  });
  test('Should respond with an array of more than 3 elements', async () => {
    const response = await request(app).get(route).send();
    const body = response.body as TCoin[];
    expect(body.length).toBeGreaterThanOrEqual(3);
  });
  test('Should respond with name Bitcoin in the first name of the array', async () => {
    const response = await request(app).get(route).send();
    const body = response.body as TCoin[];
    expect(body[0]?.name).toEqual('Bitcoin');
  });
  test('Should respond with the metrics of the coins', async () => {
    const response = await request(app).get(route).send();
    const body = response.body as TCoin[];
    expect(body[0]?.metrics).toBeInstanceOf(Object);
  });
});

describe('POST PUT DELETE /price', () => {
  const route = '/price';
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).post(route).send();
    expect(response.statusCode).toBe(404);
  });
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).put(route).send();
    expect(response.statusCode).toBe(404);
  });
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).delete(route).send();
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /price/:crypto', () => {
  const exist = ['bitcoin', 'cardano', 'ethereum'];
  const noExist = ['fdsafdsafdas', 'lkjfdaskl;fdsa', '41234351'];

  // CRYPTO EXIST
  for (let index = 0; index < exist.length; index++) {
    const crypto = exist[index];
    const route = `/price/${crypto as string}`;
    test('Should respond with a type of application/json', async () => {
      const response = await request(app).get(route).send();
      expect(response.type).toEqual('application/json');
    });
    test(`Should respond with a 200 status code ${
      crypto as string
    }`, async () => {
      const response = await request(app).get(route).send();
      expect(response.statusCode).toBe(200);
    });
    test(`Should have a name and has to be the same of the route ${
      crypto as string
    }`, async () => {
      const response = await request(app).get(route).send();
      const body = response.body as TCoinSingle;
      expect(body.asset.name.toLowerCase()).toBe(crypto);
    });
  }
  // CRYPTO DO NOT EXIST
  for (let index = 0; index < exist.length; index++) {
    const crypto = noExist[index];
    const route = `/price/${crypto as string}`;

    test(`Should respond with a 400 status code ${
      crypto as string
    }`, async () => {
      const response = await request(app).get(route).send();
      expect(response.statusCode).toBe(400);
    });
    test(`Should not have asset but message ${crypto as string}`, async () => {
      const response = await request(app).get(route).send();
      const body = response.body as { message: string };
      expect(body).not.toHaveProperty('asset');
      expect(body.message).toBe('Asset not found');
    });
  }
});

describe('POST PUT DELETE /price/:crypto', () => {
  const route = '/price/bitcoin';
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).post(route).send();
    expect(response.statusCode).toBe(404);
  });
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).put(route).send();
    expect(response.statusCode).toBe(404);
  });
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).delete(route).send();
    expect(response.statusCode).toBe(404);
  });
});
