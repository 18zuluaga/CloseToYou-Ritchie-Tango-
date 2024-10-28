import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/navigation';
import {useContacts} from '../../../hook/useContacts';
import {Contact} from '../../../interface/contact.interface';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import  Icon  from 'react-native-vector-icons/Entypo';

export const CreateContactScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Contact>();
  const {addContact} = useContacts();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [imageUri, setImageUri] = useState<string | undefined>();

  const onSubmit = (data: Contact) => {
    addContact({...data, image: imageUri});
    navigation.navigate('Home');
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen.');
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      } else {
        console.log('Error en la selección de imagen.');
      }
    });
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('Usuario canceló la captura de foto.');
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      } else {
        console.log('Error al tomar la foto.');
      }
    });
  };

  return (
    <ImageBackground
      source={require('../../../../assets/rick-rothenberg-YTd1PtoUKlo-unsplash.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Contacto</Text>

        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
          ) : (
            <TouchableOpacity style={styles.imagePreview}>
              <Icon name="images" size={35}></Icon>
              <Text style={{fontSize:15}}>Agregar imagen</Text>
            </TouchableOpacity>
          )}
          <Button title="Seleccionar Imagen" onPress={selectImage} />
          <Button title="Tomar Foto" onPress={takePhoto} />
        </View>

        <Controller
          control={control}
          rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.name && (
          <Text style={styles.error}>El nombre es requerido.</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email inválido',
            },
          }}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>
            {errors.email.message || 'El correo es requerido.'}
          </Text>
        )}

        <Controller
          control={control}
          rules={{required: true}}
          name="role"
          render={({field: {onChange, value}}) => (
            <View style={styles.roleContainer}>
              <TouchableOpacity
                onPress={() => onChange('Cliente')}
                style={[
                  styles.roleButton,
                  value === 'Cliente' && styles.selectedRole,
                ]}>
                <Text style={styles.roleText}>Cliente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('Empleado')}
                style={[
                  styles.roleButton,
                  value === 'Empleado' && styles.selectedRole,
                ]}>
                <Text style={styles.roleText}>Empleado</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.role && <Text style={styles.error}>El rol es requerido.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: 'Número inválido',
            },
          }}
          name="number"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Número de Teléfono"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? value.toString() : ''}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.number && (
          <Text style={styles.error}>
            {errors.number.message || 'El número es requerido.'}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Agregar Contacto"
            onPress={handleSubmit(onSubmit)}
            color="#000"
          />
        </View>

        <View style={styles.cancelButtonContainer}>
          <Button title="Cancelar" onPress={handleCancel} color="#ff4444" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: '#000',
    textAlign: 'left',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
  },
  selectedRole: {
    backgroundColor: '#e0e0e0',
  },
  roleText: {
    fontSize: 16,
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  cancelButtonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 100,
    gap: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    color: '#888',
    marginBottom: 10,
  },
});

export default CreateContactScreen;
