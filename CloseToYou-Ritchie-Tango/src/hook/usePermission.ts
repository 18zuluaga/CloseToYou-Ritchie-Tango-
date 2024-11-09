
import { check, request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

// Tipo de permisos soportados
type PermissionType = 'location' | 'camera' | 'contacts';

interface UsePermissionResult {
  requestPermission: (permissionType: PermissionType) => Promise<PermissionStatus | undefined>;
  checkPermission: (permissionType: PermissionType) => Promise<PermissionStatus | undefined>;
}


const usePermission = (): UsePermissionResult => {

  const checkPermission = async (permissionType: PermissionType) => {
    let result;
    switch (permissionType) {
      case 'location':
        result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        break;
      case 'camera':
        result = await check(PERMISSIONS.ANDROID.CAMERA);
        break;
      case 'contacts':
        result = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
        break;
      default:
        return;
    }
    return result;
  };

  const requestPermission = async (permissionType: PermissionType) => {
    let result;
    switch (permissionType) {
      case 'location':
        result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        break;
      case 'camera':
        result = await request(PERMISSIONS.ANDROID.CAMERA);
        break;
      case 'contacts':
        result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
        break;
      default:
        return;
    }
    return result;
  };

  return { requestPermission, checkPermission };
};

export default usePermission;
