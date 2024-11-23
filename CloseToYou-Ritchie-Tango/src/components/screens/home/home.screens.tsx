import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHomeScreen } from './hook/useHomeScreen';
import { ContactCard } from './components/contactCard.component';
import { useContacts } from '../../../hook/useContacts';
import Icon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './css/home';
import { RootStackParamList } from '../../../navigation/app.container.navigation';
import usePermission from '../../../hook/usePermission';
import { RESULTS } from 'react-native-permissions';
import { IPermission } from '../../../interface/permission.interface';
import Contacts from 'react-native-contacts'; // Importa react-native-contacts

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { showContacts, handleScroll } = useHomeScreen();
  const { handlesearch, contacts, searchQuery, loadContacts } =
    useContacts();
  const focus = useIsFocused();
  const { requestPermission, checkPermission } = usePermission();
  const [permissionStatus, setPermissionStatus] = useState<IPermission>({
    camera: 'unavailable',
    location: 'unavailable',
    contacts: 'unavailable',
  });

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await checkPermission('camera');
      const locationPermission = await checkPermission('location');
      const contactsPermission = await checkPermission('contacts');

      setPermissionStatus({
        camera: cameraPermission || 'denied',
        location: locationPermission || 'denied',
        contacts: contactsPermission || 'denied',
      });
    };

    checkPermissions();
  }, [checkPermission]);
  
  requestPermission('location');
  requestPermission('camera');
  requestPermission('contacts');

  useEffect(() => {
    if (focus) {
      loadContacts(undefined);
    }
  }, [focus, loadContacts]);

  useEffect(() => {
    if (permissionStatus.contacts === RESULTS.GRANTED) {
      Contacts.getAll()
        .then((deviceContacts) => {
          console.log(deviceContacts);
        })
        .catch((error) => {
          console.log('Error al obtener los contactos:', error);
        });
    }
  }, [permissionStatus.contacts]);

  if (
    permissionStatus.camera === RESULTS.UNAVAILABLE ||
    permissionStatus.contacts === RESULTS.UNAVAILABLE ||
    permissionStatus.location === RESULTS.UNAVAILABLE
  ) {
    return (
      <View style={{ margin: 'auto' }}>
        <ActivityIndicator size={'large'} color={'#63626c'} />
        <Text style={{ textAlign: 'center' }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {showContacts ? (
          <Text style={styles.title}>Contactos</Text>
        ) : (
          <TextInput
            placeholder="Buscar contacto"
            placeholderTextColor="black"
            style={{ ...styles.searchInput, marginTop: showContacts ? 10 : 0 }}
            onChangeText={handlesearch}
            value={searchQuery}
          />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('CreateContact')}>
          <Icon name="plus" size={30} color={'#000'} />
        </TouchableOpacity>
      </View>
      {showContacts && (
        <TextInput
          placeholder="Buscar contacto"
          placeholderTextColor="black"
          style={{ ...styles.searchInput, marginTop: showContacts ? 10 : 0 }}
          onChangeText={handlesearch}
          value={searchQuery}
        />
      )}
      {contacts[0] ? (
        <SectionList
          sections={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ContactCard
              item={item}
              styles={styles}
              handle={() => navigation.navigate('SingleContact', { contact: item })}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.contactTitle}>{title}</Text>
          )}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      ) : (
        <Text style={styles.NotFoundText}>No se han encontrado contactos.</Text>
      )}
    </SafeAreaView>
  );
};