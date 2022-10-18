import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
const { expect } = chai;

import Team from '../database/models/TeamModel';
import ILeaderResults from '../interfaces/ILeaderResults'
import { awayLeaderboard, homeLeaderboard, leaderBoard } from './mocksBoard';

chai.use(chaiHttp);

describe('Testa a rota /leaderboard', () => {
  describe('GET' , () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(leaderBoard as any);
    })
    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Deverá retornar a tabela de classificação geral com sucesso', async () => {
      const response = await chai.request(app).get('/leaderboard').send();
      expect(response).to.have.status(200);
      expect(response.body).to.be.equal(leaderBoard);
    })
  })

  describe('GET /leaderboard/home' , () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(homeLeaderboard as any);
    })
    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Deverá retornar a tabela de classificação geral com sucesso', async () => {
      const response = await chai.request(app).get('/leaderboard/home').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.equal(homeLeaderboard);
    })
  })

  describe('GET /leaderboard/away' , () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(awayLeaderboard as any);
    })
    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Deverá retornar a tabela de classificação geral com sucesso', async () => {
      const response = await chai.request(app).get('/leaderboard/away').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.equal(awayLeaderboard);
    })
  })
});
