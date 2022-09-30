import { Router } from 'express';
import LoginController from '../controllers/loginController';
import loginValidation from '../middlewares/loginValidation';
import verifyToken from '../middlewares/tokenValidation';

const route = Router();

const loginController = new LoginController();

const { verifyUsername, verifyPassword } = loginValidation;

route.post('/', verifyUsername, verifyPassword, (req, res) => loginController.login(req, res));
route.get('/validate', verifyToken, (req, res) => loginController.tokenValidate(req, res));

export default route;
