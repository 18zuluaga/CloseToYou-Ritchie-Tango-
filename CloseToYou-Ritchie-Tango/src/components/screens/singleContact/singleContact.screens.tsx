import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackParamList} from '../../../navigation/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Controller, useForm} from 'react-hook-form';
import {useContacts} from '../../../hook/useContacts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Contact} from '../../../interface/contact.interface';

type Props = NativeStackScreenProps<RootStackParamList, 'SingleContact'>;

export const SingleContactScreen: React.FC<Props> = ({route}) => {
  const {contact} = route.params;
  const [edit, setEdit] = useState<boolean>(false);
  const {deleteContact, updateContact} = useContacts();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const deleteContacts = () => {
    deleteContact(contact.id);
    navigation.navigate('Home');
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<Contact>();

  useEffect(() => {
    reset({
      name: contact.name,
      email: contact.email,
      role: contact.role,
      number: contact.number,
    });
  }, [contact, reset]);

  const styles = StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      gap: 15,
    },
    container: {
      height: 530,
      padding: 15,
      backgroundColor: '#fff',
      gap: 10,
    },
    firstLetterContainer: {
      color: '#fff',
      height: 120,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: '#63626c',
    },
    containerAccions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 60,
      gap: 10,
    },
    accion: {
      backgroundColor: '#63626c',
      width: 90,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    input: {
      height: 50,
      borderColor: edit ? '#ccc' : '#fff',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      color: '#000',
      fontSize: 20,
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    roleButton: {
      flex: 1,
      padding: 10,
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
    buttonSave: {
      backgroundColor: '#63626c',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      borderRadius: 10,
    },
    buttonCancel: {
      backgroundColor: '#e32424',
      height: 50,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    containerButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 60,
      gap: 10,
    },
  });

  return (
    <>
      <LinearGradient colors={['#9b9b95', '#94969c']} style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.firstLetterContainer}>
            {contact.image ? (
              <Image
                source={{
                  uri: contact.image,
                }}></Image>
            ) : (
              <Text style={{fontSize: 55, color: '#fff', fontWeight: 'bold'}}>
                {contact.name[0]}
              </Text>
            )}
          </View>
          <Text style={{fontSize: 30, color: '#fff', fontWeight: 'bold'}}>
            {contact.name}
          </Text>
          <View style={styles.containerAccions}>
            <View style={styles.accion}>
              <Icon name="chatbubble-sharp" color={'#fff'} size={20} />
              <Text style={{fontSize: 12, color: '#fff'}}> Mensaje </Text>
            </View>
            <View style={styles.accion}>
              <Icon name="call" color={'#fff'} size={20} />
              <Text style={{fontSize: 12, color: '#fff'}}> Llamar </Text>
            </View>
            <View style={styles.accion}>
              <TouchableOpacity
                onPress={toggleEdit}
                style={{alignItems: 'center'}}>
                <Icon name="pencil" color={'#fff'} size={20} />
                <Text style={{fontSize: 12, color: '#fff'}}> editar </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accion}>
              <TouchableOpacity
                onPress={deleteContacts}
                style={{alignItems: 'center'}}>
                <Icon name="trash" color={'#fff'} size={20} />
                <Text style={{fontSize: 12, color: '#fff'}}>Eliminar </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              editable={edit}
              placeholder="Nombre"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
              editable={edit}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>
            {errors.email.message || 'El correo es requerido.'}
          </Text>
        )}

        {edit ? (
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
        ) : (
          <TextInput
            style={styles.input}
            editable={edit}
            placeholder="Rol"
            value={contact.role}
          />
        )}
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
              editable={edit}
              placeholder="Número de Teléfono"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? value.toString() : contact.number.toString()}
            />
          )}
        />
        {errors.number && (
          <Text style={styles.error}>
            {errors.number.message || 'El número es requerido.'}
          </Text>
        )}

        {edit && (
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={handleSubmit(data => {
                updateContact({...data, id: contact.id}); // Incluye el ID del contacto
                toggleEdit();
              })}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Guardar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={toggleEdit}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};
