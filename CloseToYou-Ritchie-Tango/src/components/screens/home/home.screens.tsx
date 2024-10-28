import React, { useCallback } from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHomeScreen } from './hook/useHomeScreen';
import { ContactCard } from './components/contactCard.component';
import { RootStackParamList } from '../../../navigation/navigation';
import { useContacts } from '../../../hook/useContacts';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { showContacts, handleScroll } = useHomeScreen();
  const { handlesearch, groupedContacts, searchQuery, loadContacts } = useContacts();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [loadContacts])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundStyle.backgroundColor,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      paddingTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? Colors.light : Colors.dark,
      backgroundColor: backgroundStyle.backgroundColor,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: !isDarkMode ? Colors.darker : Colors.lighter,
    },
    searchInput: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 15,
      backgroundColor: !isDarkMode ? Colors.lighter : '#333',
      color: !isDarkMode ? Colors.darker : Colors.lighter,
      marginTop: showContacts ? 10 : 0,
      width: '90%',
    },
    contacto: {
      backgroundColor: !isDarkMode ? Colors.lighter : '#444',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    contactName: {
      fontWeight: '700',
      fontSize: 18,
      color: !isDarkMode ? Colors.darker : Colors.lighter,
    },
    contactTitle: {
      fontWeight: '700',
      fontSize: 18,
      marginBottom: 10,
      color: !isDarkMode ? Colors.darker : Colors.lighter,
    },
    contactRole: {
      color: 'gray',
      fontSize: 14,
    },
    contentContainer: {
      marginTop: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {showContacts ? (
          <Text style={styles.title}>Contactos</Text>
        ) : (
          <TextInput
            placeholder="Buscar contacto"
            placeholderTextColor="gray"
            style={styles.searchInput}
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
          style={styles.searchInput}
          onChangeText={handlesearch}
          value={searchQuery}
        />
      )}
      <SectionList
        sections={groupedContacts()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard
            name={item.name}
            role={item.role}
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
