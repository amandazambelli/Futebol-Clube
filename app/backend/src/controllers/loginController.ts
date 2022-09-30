import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import generateToken from '../middlewares/auth';

class LoginController {
  public login = async (req: Request, res: Response) => {
    const loginService = new LoginService();
    const findUser = await loginService.login(req.body);

    if (!findUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    console.log(findUser);

    const { id, role } = findUser;
    const token = generateToken({ id, role });
    res.status(200).json({ token });
  };

  public tokenValidate = async (req: Request, res: Response) => {
    const role = req.user;
    res.status(200).json({ role });
  };
}

export default LoginController;
