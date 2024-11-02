import { launchImageLibrary } from 'react-native-image-picker';

export const selectImage = (callback: (uri: string | undefined) => void): void => {
  launchImageLibrary({ mediaType: 'photo' }, response => {
    if (response.didCancel) {
      console.log('Usuario canceló la selección de imagen.');
      callback(undefined);
    } else if (response.assets) {
      callback(response.assets[0].uri);
    } else {
      console.log('Error en la selección de imagen.');
      callback(undefined);
    }
  });
};

