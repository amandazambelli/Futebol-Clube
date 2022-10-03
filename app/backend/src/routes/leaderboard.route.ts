import { Router } from 'express';
import BoardController from '../controllers/boardController';
import verifyToken from '../middlewares/tokenValidation';

const route = Router();

const boardController = new BoardController();

route.get('/home', verifyToken, (req, res) => boardController.getLeaderBoard(req, res));

export default route;
