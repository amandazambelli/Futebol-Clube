import { NextFunction, Response, Request } from 'express';

const serverError = {
  async verify(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });

    next();
  },
};

export default serverError;
