import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
const { expect } = chai;

import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const teams = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
];

const teamById = {
  id: 3,
  teamName: "Botafogo"
};

describe('Testa a rota /teams', () => {
  describe('GET' , () => {

    before(async () => {
      sinon.stub(Team, "findAll").resolves(teams as Team[])
    })
    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('Deve retornar todos os times', async () => {
      const response = await chai.request(app).post('/teams');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teams);
    })

  });

  describe('GET/id' , () => {

    before(async () => {
      sinon.stub(Team, "findByPk").resolves(teamById as Team)
    })
    after(()=>{
      (Team.findByPk as sinon.SinonStub).restore();
    })

    it('Deve retornar o time em que o ID é passado', async () => {
      const response = await chai.request(app).post('/teams/3').send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teamById);
    })

  });
});
