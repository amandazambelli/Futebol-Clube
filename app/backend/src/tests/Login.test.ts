import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
const { expect } = chai;

import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const user = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY0ODIwMTkyLCJleHAiOjE2NjQ5MDY1OTJ9.7fObxhgjUaNASVnZlYy-KTHNLr8kJ3eFGrqBP9pwGz0';

describe('Testa a rota /login', () => {
  describe('POST', () => {

    before(async () => {
      sinon.stub(User, "findOne").resolves({id: 1, ...user} as User)
    })
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Deve cadastrar um usuário com sucesso', async () => {
      const response = await chai.request(app).post('/login').send({...user, password: 'secret_admin'});

      expect(response.status).to.equal(200);
    })

    it('Não deve ser possível cadastrar usuário sem um e-mail', async () => {
      const response = await chai.request(app).post('/login').send({ ...user, email: '' });

      expect(response.status).to.equal(400);
    })

    it('Não deve ser possível cadastrar usuário sem uma senha', async () => {
      const response = await chai.request(app).post('/login').send({ ...user, password: '' });

      expect(response.status).to.equal(400);
    })

    it('Não deve ser possível cadastrar usuário com email e senha invalidos', async () => {
      const response = await chai.request(app).post('/login').send({ ...user, email: 'amanda@hello.com', password: 'amandahello' });

      expect(response.status).to.equal(401);
    })
  });

  describe('Rota GET login/validate', () => {

    before(async () => {
      sinon.stub().resolves({ role: 'admin'} as User)
    })
    after(()=>{
      sinon.restore();
    })

    it('Verifica se retorna o role do usuário em caso de sucesso', async () => {
      const response = await (await (await chai.request(app).get('/login/validate').send()).header({'token': token}));
      expect(response.status).to.equal(200);
      expect(response.body).to.have.key('role');
    })

    it('Verifica se retorna status 400 em caso de token inválido', async () => {
      const tokenInvalid = 'vohfoehoggjggkdfjzohf';
      const response = await chai.request(app).get('/login/validate').set('Authorization', tokenInvalid).send();

      expect(response.status).to.equal(401);
    })
  })
});

/**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
