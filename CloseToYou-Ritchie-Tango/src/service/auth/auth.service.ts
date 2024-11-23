import {axiosBackend} from '../../config/axios.config';
import { ILogin } from '../../interface/login.interface';
import { IRegister } from '../../interface/register.interface';
import { AUTH_API_ENDPOINTS, TEndpointKeys } from './auth.endpoints';

const getEnpoint = (method: TEndpointKeys): string => {
  return AUTH_API_ENDPOINTS()[method];
};

export class AuthService {
  static login = async (req: ILogin): Promise<string | unknown> => {
  const endpoint = getEnpoint('LOGIN');
      const token = await axiosBackend.post<{token: string}>(endpoint, req);
      return token.data.token;
};

  static register = async (req: IRegister): Promise<string> => {
    const endpoint = getEnpoint('REGISTER');
    const token = await axiosBackend.post<{token: string}>(endpoint, req);
    return token.data.token;
  };
}
