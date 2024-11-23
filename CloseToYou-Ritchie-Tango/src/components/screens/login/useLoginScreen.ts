import {useContext} from 'react';
import {ILogin} from '../../../interface/login.interface';
import {AuthService} from '../../../service/auth/auth.service';
import {GlobalContext} from '../../../hook/context/Global.context';
import {getErrorMessageAndColor} from '../../../utilities/getErrorMessageAndColor.function';
import {jwtDecode} from 'jwt-decode';
import {IUser} from '../../../interface/user.interface';
import {axiosBackend} from '../../../config/axios.config';

export const useLogin = () => {
  const {saveToken, setSnackbar} = useContext(GlobalContext)!;

  const login = async (user: ILogin) => {
    try {
      const token = await AuthService.login(user);
      if (typeof token === 'string') {
        axiosBackend.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
        const tokenDecode = jwtDecode(token) as IUser;
        saveToken({...tokenDecode, token: token});
        setSnackbar({
          message: `Bienvenido ${tokenDecode.name}`,
          color: '#77dd77',
        });
      }
      return token;
    } catch (err: any) {
      const {message, color} = getErrorMessageAndColor(err.response.status);

      setSnackbar({
        message,
        color,
      });
    }
  };

  return {
    login,
  };
};
