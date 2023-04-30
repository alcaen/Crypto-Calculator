import app from '../app';
import request from 'supertest';
import { type TReturn } from '../types/returned.type';

// Api used to updte calculator in front on demand it updates the return percentage and the price
describe('GET /monthReturn', () => {
  const route = '/monthReturn';
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).get(route).send();
    expect(response.statusCode).toBe(200);
  });
  test('Should respond with a type of application/json', async () => {
    const response = await request(app).get(route).send();
    expect(response.type).toEqual('application/json');
  });
  test('Should respond with an array of 3 elements', async () => {
    const response = await request(app).get(route).send();
    const body = response.body as TReturn[];
    expect(body.length).toBe(3);
  });
  test('Should respond with name Bitcoin in the first name of the array', async () => {
    const response = await request(app).get(route).send();
    const body = response.body as TReturn[];
    expect(body[0]?.name).toEqual('Bitcoin');
  });
  test('Should respond with a month return of 5% in first element', async () => {
    const response = await request(app).get(route).send();
    const body = response.body as TReturn[];
    expect(body[0]?.monthRet).toEqual('5');
  });
});

describe('POST PUT DELETE /monthReturn', () => {
  const route = '/monthReturn';
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
