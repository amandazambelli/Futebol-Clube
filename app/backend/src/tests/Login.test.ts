import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
const { expect } = chai;

import User from '../database/models/UserModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const user = {
  username: 'Amanda',
  role: 'user',
  email: 'amanda@trybe.com',
  password: '1234567',
}

describe('Testa a rota /login', () => {
  describe('POST', () => {

    before(async () => sinon.stub(User, "findOne").resolves({id: 1, ...user} as User))

    it('Deve cadastrar um usuário com sucesso', async () => {
      const response = await chai.request(app).post('/login').send(user);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal({id: 1, ...user});
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


  /* it('Retorna status 200 e token de autentificação', () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userMock)

    const token = tokenGenerate 
    expect(false).to.be.eq(true);
  }); */
});
