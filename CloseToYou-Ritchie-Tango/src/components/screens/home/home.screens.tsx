import React, { useEffect } from 'react';
import {
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

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { showContacts, handleScroll } = useHomeScreen();
  const { handlesearch, groupedContacts, searchQuery, loadContacts} = useContacts();
  const focus = useIsFocused();
  const { requestPermission } = usePermission();
  requestPermission('location');
  requestPermission('camera');
  requestPermission('contacts');

  useEffect(() => {
    if(focus){
      groupedContacts();
      loadContacts();
    }
  }, [groupedContacts, focus, loadContacts]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {showContacts ? (
          <Text style={styles.title}>Contactos</Text>
        ) : (
          <TextInput
            placeholder="Buscar contacto"
            placeholderTextColor="black"
            style={{...styles.searchInput,marginTop: showContacts ? 10 : 0,}}
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
          style={{...styles.searchInput,marginTop: showContacts ? 10 : 0,}}
          onChangeText={handlesearch}
          value={searchQuery}
        />
      )}
      <SectionList
        sections={groupedContacts()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactCard
            item={item}
            styles={styles}
            handle={() => navigation.navigate('SingleContact', { contact: item })}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.contactTitle}>
            {title}
          </Text>
        )}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};
