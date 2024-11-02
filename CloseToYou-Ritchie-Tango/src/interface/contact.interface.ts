import { Region } from 'react-native-maps';
import {role} from '../utilities/enum/role.enum';

export interface Contact {
  id: number;
  name: string;
  email: string;
  role: role;
  number: number;
  image?: string;
  address: Region;
}
