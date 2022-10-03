import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import verifyToken from '../middlewares/tokenValidation';
import matchesValidation from '../middlewares/matchesValidation';

const route = Router();

const matchesController = new MatchesController();

route.get('/', (req, res) => matchesController.getMatches(req, res));
route.post(
  '/',
  verifyToken,
  matchesValidation.verifyTeams,
  (req, res) => matchesController.saveMatch(req, res),
);
route.patch('/:id/finish', verifyToken, (req, res) => matchesController.finish(req, res));

export default route;
