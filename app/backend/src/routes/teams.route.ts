import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const route = Router();

const teamsController = new TeamsController();

route.get('/', (req, res) => teamsController.getTeams(req, res));
route.get('/:id', (req, res) => teamsController.findById(req, res));

export default route;
