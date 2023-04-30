import app from '../app';
import request from 'supertest';

interface THeaders {
  'content-type': string;
  [key: string]: string;
}

interface Tbody {
  id: string;
}

describe('GET /post', () => {
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).get('/post').send();
    expect(response.statusCode).toBe(200);
  });
  test('Should respond with a body true', async () => {
    const response = await request(app).get('/post').send();
    const { test } = response.body as { test: boolean };
    expect(test).toBe(true);
  });
});

describe('POST /post', () => {
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).post('/post').send();
    expect(response.statusCode).toBe(200);
  });
  test('Should respond with a JSON object in body', async () => {
    const response = await request(app).post('/post').send();
    expect(response.body).toBeInstanceOf(Object);
  });
  test('Should respond with a content-type of application/json', async () => {
    const response = await request(app).post('/post').send();
    const headers = response.headers as THeaders;
    expect(headers['content-type']).toEqual(expect.stringContaining('json'));
  });
  test('Should respond with a JSON object containing the new task with an id', async () => {
    const response = await request(app).post('/post').send({ id: 'vaquita' });
    const { id } = response.body as Tbody;
    expect(id).toBe('vaquita');
  });
});

describe('GET /fail', () => {
  test('Should respond with a 404 status code', async () => {
    const response = await request(app).get('/fail').send();
    expect(response.statusCode).toBe(404);
  });
});
