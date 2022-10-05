import { Router } from 'express';
import BoardController from '../controllers/boardController';

const route = Router();

const boardController = new BoardController();

route.get('/', (req, res) => boardController.getLeaderBoard(req, res));
route.get('/home', (req, res) => boardController.getHomeLeaderBoard(req, res));
route.get('/away', (req, res) => boardController.getAwayLeaderBoard(req, res));

export default route;
