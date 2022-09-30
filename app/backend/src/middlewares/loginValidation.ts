import { NextFunction, Response, Request } from 'express';

const loginValidation = {
  async verifyUsername(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email || email === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const validEmail = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
    if (!validEmail.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  },

  async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (!password || password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (typeof password !== 'string') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  },
};

export default loginValidation;
