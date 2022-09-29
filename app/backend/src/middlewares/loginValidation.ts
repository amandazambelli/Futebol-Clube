import { NextFunction, Response, Request } from 'express';

const loginValidation = {
  async verifyUsername(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  },

  async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  },
};

export default loginValidation;
