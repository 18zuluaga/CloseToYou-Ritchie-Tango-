import {PermissionStatus} from 'react-native-permissions';

export interface IPermission {
  camera: PermissionStatus;
  location: PermissionStatus;
  contacts: PermissionStatus;
}
