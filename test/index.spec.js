import { merge } from 'lodash';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import faker from 'faker';
import { expect } from 'chai';

import express from '../src';

const { request } = express;

describe('request extra', () => {
  describe('unit', () => {
    beforeEach(() => {
      request.params = {
        id: 1,
      };
      request.body = {
        name: faker.name.findName(),
        email: faker.internet.email(),
      };
      request.query = {
        age: 14,
      };
    });

    afterEach(() => {
      delete request.params;
      delete request.body;
      delete request.query;
    });

    it('should be able to get all request input data', () => {
      const all = merge({}, request.params, request.query, request.body);
      expect(request.all).to.exist;
      expect(request.all).to.be.a('function');
      expect(request.all.name).to.be.equal('all');
      expect(request.all.length).to.be.equal(0);
      expect(request.all()).to.eql(all);
    });

    it('should be able to get specified request input data', () => {
      const input = merge({}, request.params, request.query, request.body);
      expect(request.input).to.exist;
      expect(request.input).to.be.a('function');
      expect(request.input.name).to.be.equal('input');
      expect(request.input.length).to.be.equal(2);
      expect(request.input()).to.eql(input);
    });

    it('should be able to get specified request input data', () => {
      expect(request.input).to.be.a('function');
      expect(request.input.name).to.be.equal('input');
      expect(request.input.length).to.be.equal(2);
      expect(request.input('age')).to.equal(request.query.age);
    });

    it('should be able to get specified request input data', () => {
      const defaultValue = 34;
      expect(request.input).to.be.a('function');
      expect(request.input.name).to.be.equal('input');
      expect(request.input.length).to.be.equal(2);
      expect(request.input('level', defaultValue)).to.equal(defaultValue);
    });

    it('should be able to get only specified request input data', () => {
      const only = merge({}, request.params);
      expect(request.only).to.be.a('function');
      expect(request.only.name).to.be.equal('only');
      expect(request.only.length).to.be.equal(0);
      expect(request.only('id')).to.eql(only);
    });

    it('should be able to get only specified request input data', () => {
      const only = merge({}, request.body);
      expect(request.only).to.be.a('function');
      expect(request.only.name).to.be.equal('only');
      expect(request.only.length).to.be.equal(0);
      expect(request.only('name', 'email')).to.eql(only);
    });

    it('should be able to get only specified request input data', () => {
      const only = merge({}, request.body);
      expect(request.only).to.be.a('function');
      expect(request.only.name).to.be.equal('only');
      expect(request.only.length).to.be.equal(0);
      expect(request.only(['name', 'email'])).to.eql(only);
    });

    it('should be able to get only specified request input data', () => {
      const only = merge({}, request.body);
      expect(request.only).to.be.a('function');
      expect(request.only.name).to.be.equal('only');
      expect(request.only.length).to.be.equal(0);
      expect(request.only(['name'], 'email')).to.eql(only);
    });

    it('should be able to get all except specified request input data', () => {
      const except = merge({}, request.body);
      expect(request.except).to.be.a('function');
      expect(request.except.name).to.be.equal('except');
      expect(request.except.length).to.be.equal(0);
      expect(request.except('id', 'age')).to.eql(except);
    });

    it('should be able to get all except specified request input data', () => {
      const except = merge({}, request.body);
      expect(request.except).to.be.a('function');
      expect(request.except.name).to.be.equal('except');
      expect(request.except.length).to.be.equal(0);
      expect(request.except(['id'], 'age')).to.eql(except);
    });

    it('should be able to merge additional input data', () => {
      const data = { level: 14 };
      const merged = merge(
        {},
        request.params,
        request.query,
        request.body,
        data
      );
      expect(request.merge).to.be.a('function');
      expect(request.merge.name).to.be.equal('merge');
      expect(request.merge.length).to.be.equal(0);
      expect(request.merge(data)).to.eql(merged);
    });

    it('should be able to merge defaults input data', () => {
      const defaults = { age: 14 };
      const merged = merge({}, request.params, request.query, request.body);
      expect(request.defaults).to.be.a('function');
      expect(request.defaults.name).to.be.equal('defaults');
      expect(request.defaults.length).to.be.equal(0);
      expect(request.defaults(defaults)).to.eql(merged);
    });

    it('should be able to merge defaults input data', () => {
      const defaults = { level: 14 };
      const merged = merge(
        {},
        request.params,
        request.query,
        request.body,
        defaults
      );
      expect(request.defaults).to.be.a('function');
      expect(request.defaults.name).to.be.equal('defaults');
      expect(request.defaults.length).to.be.equal(0);
      expect(request.defaults(defaults)).to.eql(merged);
    });

    it('should be able to check if key exist in request input data', () => {
      expect(request.exists).to.be.a('function');
      expect(request.exists.name).to.be.equal('exists');
      expect(request.exists.length).to.be.equal(1);
      expect(request.exists('age')).to.be.true;
      expect(request.has('age')).to.be.true;
    });

    it('should be able to check if key exist in request input data', () => {
      expect(request.exists).to.be.a('function');
      expect(request.exists.name).to.be.equal('exists');
      expect(request.exists.length).to.be.equal(1);
      expect(request.exists('level')).to.be.false;
      expect(request.has('level')).to.be.false;
    });
  });

  describe('intergration', () => {
    let app;
    before(() => {
      app = express();
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.all('/:id?', (req, res) => {
        res.json(req.all());
      });
    });

    it('should be able to parse json bodies', (done) => {
      const body = {
        point: 4,
      };
      supertest(app)
        .post('/')
        .send(body)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response.body).to.exist;
          expect(response.body).to.be.eql(body);
          done(error, response);
        });
    });

    it('should be able to parse query strings', (done) => {
      const body = {
        point: 4,
      };
      const expected = merge({}, body, { level: 4 });
      supertest(app)
        .post('/?level=4')
        .send(body)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response.body).to.exist;
          expect(response.body).to.be.eql(expected);
          done(error, response);
        });
    });

    it('should be able to parse path params', (done) => {
      const body = {
        point: 4,
      };
      const expected = merge({}, body, { id: 14, level: 4 });
      supertest(app)
        .post('/14?level=4')
        .send(body)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response.body).to.exist;
          expect(response.body).to.be.eql(expected);
          done(error, response);
        });
    });
  });
});
