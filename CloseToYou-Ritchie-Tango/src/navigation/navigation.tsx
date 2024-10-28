import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../components/screens/home/home.screens';
import {CreateContactScreen} from '../components/screens/createContact/createContact.screens';
import {SingleContactScreen} from '../components/screens/singleContact/singleContact.screens';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Contact } from '../interface/contact.interface';

export type RootStackParamList = {
  Home: undefined;
  CreateContact: undefined;
  SingleContact: {contact: Contact};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
          options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#9b9b95',
            },
            headerShadowVisible: false,
            headerBackTitleVisible: false, // Oculta el texto de la flecha
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 10}}>
                <Icon name="arrowleft" size={20} color={'#fff'} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
