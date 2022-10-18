import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
const { expect } = chai;

import Matches from '../database/models/MatchesModel';
// import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const matches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
      teamName: "Internacional",
    },
    teamAway: {
      teamName: "Santos",
    }
  },
];

const trueInProgress = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 1,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Grêmio",
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: 1,
    teamHome: {
      teamName: "Internacional",
    },
    teamAway: {
      teamName: "Santos",
    }
  },
];

describe('Testa a rota /matches', () => {
  describe('GET' , () => {

    before(async () => {
      sinon.stub(Matches, "findAll").resolves(matches as unknown as Matches[])
    })
    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Deve retornar todas as partidas', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(matches);
    })
  });

  describe('GET /matches?inProgress=true' , () => {

    before(async () => {
      sinon.stub(Matches, "findAll").resolves(trueInProgress as unknown as Matches[])
    })
    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Deve retornar todas as partidas em andamento', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(trueInProgress);
    })
  })

  describe('GET /matches?inProgress=false' , () => {

    before(async () => {
      sinon.stub(Matches, "findAll").resolves(matches as unknown as Matches[])
    })
    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Deve retornar todas as partidas em andamento', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(matches);
    })
  })
});
