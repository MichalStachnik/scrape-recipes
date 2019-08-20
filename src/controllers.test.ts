const request = require('supertest');
const express = require('express');
const app = express();
import { fetchLaurainthekitchen, fetchMaangi, fetchEatTheLove, fetchNyt } from './controllers';


test('it should have fetchLaurainthekitchen controller function that is defined', () => {
  expect(fetchLaurainthekitchen).toBeDefined();
});

test('it should have fetchMaangi controller function that is defined', () => {
  expect(fetchMaangi).toBeDefined();
});

test('it should have fetchEatTheLove controller function that is defined', () => {
  expect(fetchEatTheLove).toBeDefined();
});

test('it should have fetchNyt controller function that is defined', () => {
  expect(fetchNyt).toBeDefined();
});

test('it should fetch fetchLaurainthekitchen', () => {
  request(app)
    .get('/laurainthekitchen')
    .expect(200)
    .end(function(err: any, res: any) {
      if(err) throw err;
    })
});

test('it should fetch maangi', () => {
  request(app)
    .get('/maangi')
    .expect(200)
    .end(function(err: any, res: any) {
      if(err) throw err;
    })
});

test('it should fetch eatthelove', () => {
  request(app)
    .get('/eatthelove')
    .expect(200)
    .end(function(err: any, res: any) {
      if(err) throw err;
    })
});

test('it should fetch nytimes', () => {
  request(app)
    .get('/nytimes')
    .expect(200)
    .end(function(err: any, res: any) {
      if(err) throw err;
    })
});
