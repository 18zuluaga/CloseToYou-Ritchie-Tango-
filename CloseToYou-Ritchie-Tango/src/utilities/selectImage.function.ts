import { launchImageLibrary } from 'react-native-image-picker';

export const selectImage = (callback: (uri: string | undefined) => void): void => {
  launchImageLibrary({ mediaType: 'photo' }, response => {
    if (response.didCancel) {
      callback(undefined);
    } else if (response.assets) {
      callback(response.assets[0].uri);
    } else {
      callback(undefined);
    }
  });
};

