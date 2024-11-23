import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark,
    backgroundColor: Colors.lighter,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  searchInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '90%',
  },
  contacto: {
    backgroundColor: Colors.lighter,
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
    color: Colors.dark,
  },
  contactTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
    color: Colors.dark,
  },
  contactRole: {
    color: 'gray',
    fontSize: 14,
  },
  contentContainer: {
    marginTop: 10,
  },
  NotFoundText: {
    margin: 'auto',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});
