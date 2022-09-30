import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const route = Router();

const matchesController = new MatchesController();

route.get('/', (req, res) => matchesController.getMatches(req, res));

export default route;
