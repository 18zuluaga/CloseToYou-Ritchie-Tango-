import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {RootStackParamList} from '../../../navigation/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Controller, useForm} from 'react-hook-form';
import {useContacts} from '../../../hook/useContacts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Contact} from '../../../interface/contact.interface';
import MapView, {MapPressEvent, Marker, Region} from 'react-native-maps';
import {styles} from './style/singleContact.style';
import {selectImage} from '../../../utilities/selectImage.function';
import {typePicture} from '../../../utilities/enum/typePicture.enum';
import {takePhoto} from '../../../utilities/takePhoto.function';
import IconE from 'react-native-vector-icons/Entypo';
import { IWeather } from '../../../interface/weather.interface';
import { useSingleContact } from './hook/useSingleContact';

type Props = NativeStackScreenProps<RootStackParamList, 'SingleContact'>;

export const SingleContactScreen: React.FC<Props> = ({route}) => {
  const {contact} = route.params;
  const [edit, setEdit] = useState<boolean>(false);
  const {deleteContact, updateContact, loadContacts, contactById} =
    useContacts();
  const [location, setLocation] = useState<Region>(contact.address);
  const {getWeather } = useSingleContact();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | undefined>(contact.image);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState<boolean>(false);
  const [weather, setWeather] = useState<IWeather>();

  useEffect( () => {
        const weatherResp = async () => {
          const weatherRespo = await getWeather(location);
          setWeather(weatherRespo);
        };
        weatherResp();
  }, [location, getWeather]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onMapPress = (e: MapPressEvent) => {
    if (edit) {
      setLocation({
        ...e.nativeEvent.coordinate,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });
    }
  };

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

  const handleImage = (type: typePicture) => {
    if (type === typePicture.selectImage) {
      selectImage(imageUris => {
        setImageUri(imageUris);
      });
    } else if (type === typePicture.takePhoto) {
      takePhoto(imageUris => {
        setImageUri(imageUris);
      });
    }
    setModalVisible(false);
  };

  useEffect(() => {
    reset({
      name: contact.name,
      email: contact.email,
      role: contact.role,
      number: contact.number,
    });
  }, [contact, reset]);

  return (
    <>
      <LinearGradient colors={['#9b9b95', '#94969c']} style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.firstLetterContainer}>
            {edit ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {imageUri ? (
                  <Image
                    style={styles.firstLetterContainer}
                    source={{
                      uri: imageUri,
                    }}
                  />
                ) : (
                  <IconE name="images" color={'#fff'} size={45}></IconE>
                )}
              </TouchableOpacity>
            ) : imageUri ? (
              <Image
                style={styles.firstLetterContainer}
                source={{
                  uri: imageUri,
                }}
              />
            ) : (
              <Text style={{fontSize: 55, color: '#fff', fontWeight: 'bold'}}>
                {contact.name[0]}
              </Text>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Seleccionar Método</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.butonImage} onPress={() => handleImage(typePicture.selectImage)}>
                      <Icon size={20} name="images"></Icon>
                      <Text>Seleccionar Imagen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.butonImage} onPress={() => handleImage(typePicture.takePhoto)}>
                    <Icon size={23} name="camera"></Icon>
                      <Text>Tomar Foto</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeModal}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
                <Text style={{fontSize: 12, color: '#fff'}}> Editar </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accion}>
              <TouchableOpacity
                onPress={() => setConfirmDeleteModalVisible(true)}
                style={{alignItems: 'center'}}>
                <Icon name="trash" color={'#fff'} size={20} />
                <Text style={{fontSize: 12, color: '#fff'}}>Eliminar </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={() => setConfirmDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Estás seguro que quieres eliminar a "{contact.name}"?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={deleteContacts}>
                <Text style={styles.buttonTextEliminar}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmDeleteModalVisible(false)}>
                <Text style={styles.buttonTextCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{...styles.input, borderColor: edit ? '#ccc' : '#fff'}}
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
              style={{...styles.input, borderColor: edit ? '#ccc' : '#fff'}}
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
            style={{...styles.input, borderColor: edit ? '#ccc' : '#fff'}}
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
              style={{...styles.input, borderColor: edit ? '#ccc' : '#fff'}}
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

        <MapView
          style={styles.map}
          initialRegion={location}
          zoomControlEnabled
          onPress={(event: MapPressEvent) => onMapPress(event)}
          showsPointsOfInterest>
          <Marker coordinate={location} />
        </MapView>

        <Text>{weather?.main.temp}</Text>

        {edit && (
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={handleSubmit(data => {
                updateContact({
                  ...data,
                  id: contact.id,
                  address: location,
                  image: imageUri,
                });
                toggleEdit();
                loadContacts();
                const newContact = contactById(contact.id);
                console.log(newContact);
                if (newContact) {
                  console.log('Contact');
                  navigation.navigate('SingleContact', {contact: newContact});
                } else {
                  navigation.navigate('Home');
                }
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
