import {launchCamera} from 'react-native-image-picker';

export const takePhoto = (
  callback: (uri: string | undefined) => void,
): void => {
  launchCamera({mediaType: 'photo'}, response => {
    if (response.didCancel) {
      console.log('Usuario canceló la captura de foto.');
      callback(undefined);
    } else if (response.assets) {
      callback(response.assets[0].uri);
    } else {
      console.log('Error al tomar la foto.');
      callback(undefined);
    }
  });
};
