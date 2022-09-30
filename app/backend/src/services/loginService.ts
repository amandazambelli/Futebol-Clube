import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';

class LoginService {
  public login = async (userInfo: ILogin) => {
    const { email, password } = userInfo;
    const findUser = await UserModel.findOne({ where: { email } });

    if (!findUser) {
      return undefined;
    }

    const passwordDecoded = bcrypt.compareSync(password, findUser.password);

    if (passwordDecoded === false) {
      return undefined;
    }

    return findUser;
  };
}

export default LoginService;
