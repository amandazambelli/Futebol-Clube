import UserModel from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';

class LoginService {
  public login = async (userInfo: ILogin) => {
    const { email, password } = userInfo;
    const findUser = await UserModel.findOne({ where: { email } });

    if (!findUser || findUser.password !== password) {
      return undefined;
    }

    return findUser;
  };
}

export default LoginService;
