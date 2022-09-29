import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

const JWT_CONFIG: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

type UserToken = {
  id: number;
  role: string;
};

const generateToken = (payload: UserToken) => {
  const token = jwt.sign(
    payload,
    JWT_SECRET,
    JWT_CONFIG,
  );

  return token;
};

export default generateToken;
