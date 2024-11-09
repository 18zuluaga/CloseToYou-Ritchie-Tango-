import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { RootStackParamList } from '../../../navigation/app.container.navigation';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen : React.FC<Props> = ({ navigation }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#ffffff',
          image: <Image source={require('../../../../assets/undraw_People_search_re_5rre.png')} style={styles.image} />,
          title: 'Gestiona tus contactos',
          subtitle: 'Organiza y clasifica tus contactos de empleados y clientes de manera eficiente.',
        },
        {
          backgroundColor: '#ffffff',
          image: <Image source={require('../../../../assets/undraw_Contact_us_re_4qqt.png')} style={styles.image} />,
          title: 'Crea tu red de contactos',
          subtitle: 'Añade fácilmente nuevos contactos y asigna información relevante como ubicación.',
        },
        {
          backgroundColor: '#ffffff',
          image: <Image source={require('../../../../assets/undraw_Delivery_address_re_cjca.png')} style={styles.image} />,
          title: 'Ubica y organiza',
          subtitle: 'Asigna ubicaciones a tus contactos y encuentra rápidamente a los que necesitas.',
        },
      ]}
      nextLabel="Siguiente"
      skipLabel="Saltar"
      showNext={true}
      showSkip={true}
      onSkip={() => navigation.navigate('Login')}
      onDone={() => navigation.navigate('Login')}
      showDone={true}
      bottomBarHeight={80}
      controlStatusBar={true}
      titleStyles={styles.titleStyles}
      subTitleStyles={styles.subTitleStyles}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  titleStyles: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subTitleStyles: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#7f8c8d',
    textAlign: 'center',
    marginHorizontal: 30,
  },
});

export default OnboardingScreen;
