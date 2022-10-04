import { Router } from 'express';
import BoardController from '../controllers/boardController';
// import verifyToken from '../middlewares/tokenValidation';

const route = Router();

const boardController = new BoardController();

route.get('/home', (req, res) => boardController.getHomeLeaderBoard(req, res));
route.get('/away', (req, res) => boardController.getAwayLeaderBoard(req, res));

export default route;
