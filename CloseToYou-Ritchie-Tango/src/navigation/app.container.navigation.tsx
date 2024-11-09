import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Contact} from '../interface/contact.interface';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../components/screens/home/home.screens';
import {SingleContactScreen} from '../components/screens/singleContact/singleContact.screens';
import CreateContactScreen from '../components/screens/createContact/createContact.screens';
import LoginScreen from '../components/screens/login/login.screens';
import {AuthContext} from '../hook/context/auth.context';
import OnboardingScreen from '../components/screens/ onboarding/onboarding.screen';
import RegisterScreen from '../components/screens/register/register.screens';

export type RootStackParamList = {
  Home: undefined;
  CreateContact: undefined;
  SingleContact: {contact: Contact};
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator();

export const NavigationCont: React.FC = () => {
  const {token, isLoading} = useContext(AuthContext)!;

  if (isLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'Home' : 'Onboarding'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateContact"
          component={CreateContactScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="SingleContact"
          component={SingleContactScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
