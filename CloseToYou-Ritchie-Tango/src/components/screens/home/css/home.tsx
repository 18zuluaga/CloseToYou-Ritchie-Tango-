import { StyleSheet, useColorScheme } from "react-native";

const isDarkMode = useColorScheme() === 'dark';
  const [showContacts, setShowContacts] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    image: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
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
    searchInputs: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 15,
      backgroundColor: !isDarkMode ? Colors.lighter : '#333',
      color: !isDarkMode ? Colors.darker : Colors.lighter,
      marginTop: showContacts ? 10 : 0,
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
    contactRole: {
      color: 'gray',
      fontSize: 14,
    },
    contentContainer: {
      marginTop: 10,
    },
  });