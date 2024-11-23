import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useContacts} from '../../../hook/useContacts';
import {IContact} from '../../../interface/contact.interface';
import Icon from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import MapView, { MapPressEvent, Marker, Region} from 'react-native-maps';
import {styles} from './css/creteContact.styles';
import {typePicture} from '../../../utilities/enum/typePicture.enum';
import {selectImage} from '../../../utilities/selectImage.function';
import {takePhoto} from '../../../utilities/takePhoto.function';
import {RootStackParamList} from '../../../navigation/app.container.navigation';
import usePermission from '../../../hook/usePermission';
import { RESULTS } from 'react-native-permissions';
import {ModalNoPermission} from '../../common/modalNoPermission.components';
import {IPermission} from '../../../interface/permission.interface';

export const CreateContactScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IContact>();
  const {addContact} = useContacts();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [location, setLocation] = useState<Region>({
    latitude: 6.219574005345421,
    longitude: -75.5836361669855,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNoPermission, setModalVisibleNoPermission] =
    useState(false);
  const onSubmit = async (data: IContact) => {
    const newconatc = await addContact({...data, image: imageUri, address: location});
    if(newconatc){
      navigation.navigate('Home');
    }
  };
  const {checkPermission} = usePermission();
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

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const onMapPress = (e: MapPressEvent) => {
      setLocation({
        ...e.nativeEvent.coordinate,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });
  };

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

  if (
    permissionStatus.camera === RESULTS.UNAVAILABLE ||
    permissionStatus.contacts === RESULTS.UNAVAILABLE ||
    permissionStatus.location === RESULTS.UNAVAILABLE
  ) {
    return (
      <View style={{margin: 'auto'}}>
        <ActivityIndicator size={'large'} color={'#63626c'}></ActivityIndicator>
        <Text style={{textAlign: 'center'}}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Contacto</Text>

        <View style={styles.imageContainer}>
          {imageUri ? (
            <TouchableOpacity
              onPress={() =>
                permissionStatus.camera === RESULTS.DENIED
                  ? setModalVisibleNoPermission(true)
                  : setModalVisible(true)
              }>
              <Image source={{uri: imageUri}} style={styles.imagePreview} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                permissionStatus.camera === RESULTS.DENIED
                  ? setModalVisibleNoPermission(true)
                  : setModalVisible(true)
              }
              style={styles.imagePreview}>
              <Icon name="images" color={'#fff'} size={45}></Icon>
            </TouchableOpacity>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Método</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.butonImage}
                  onPress={() => handleImage(typePicture.selectImage)}>
                  <Icon size={20} name="images"></Icon>
                  <Text>Seleccionar Imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.butonImage}
                  onPress={() => handleImage(typePicture.takePhoto)}>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleNoPermission}
          onRequestClose={() => setModalVisibleNoPermission(false)}>
          <ModalNoPermission setModalVisible={setModalVisibleNoPermission} />
        </Modal>
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
          name="phone"
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
        {errors.phone && (
          <Text style={styles.error}>
            {errors.phone.message || 'El número es requerido.'}
          </Text>
        )}

        <MapView
          style={styles.map}
          initialRegion={location}
          onPress={(event: MapPressEvent) =>
            onMapPress(event)
          }
          zoomControlEnabled
          showsUserLocation
          showsPointsOfInterest>
          <Marker
            coordinate={location}
            title="Mi Ubicación"
            description="Estás aquí!"
          />
        </MapView>

        <View style={styles.buttonContainerAccions}>
          <TouchableOpacity onPress={handleCancel}>
            <IconI name="close" color="#e32424" size={38}></IconI>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <IconF name="save" color="#63626c" size={30}></IconF>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateContactScreen;
