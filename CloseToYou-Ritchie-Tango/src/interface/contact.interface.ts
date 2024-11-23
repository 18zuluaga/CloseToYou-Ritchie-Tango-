import { Region } from 'react-native-maps';
import {role} from '../utilities/enum/role.enum';

export interface IContact {
  id: number;
  name: string;
  email: string;
  role: role;
  phone: number;
  image?: string;
  address: Region;
}
