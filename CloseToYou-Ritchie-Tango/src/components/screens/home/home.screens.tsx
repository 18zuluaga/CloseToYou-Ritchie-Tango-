import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHomeScreen } from "./hook/useHomeScreen";
import { ContactCard } from "./components/contactCard.component";
import { useContacts } from "../../../hook/useContacts";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./css/home";
import { RootStackParamList } from "../../../navigation/app.container.navigation";
import usePermission from "../../../hook/usePermission";
import { RESULTS } from "react-native-permissions";
import { IPermission } from "../../../interface/permission.interface";
import Contacts from "react-native-contacts"; // Importa react-native-contacts
import { IContact } from "../../../interface/contact.interface";
import { role } from "../../../utilities/enum/role.enum";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { showContacts, handleScroll } = useHomeScreen();
  const {
    handlesearch,
    contacts,
    searchQuery,
    loadContacts,
    syncronize,
  } = useContacts();
  const focus = useIsFocused();
  const { requestPermission, checkPermission } = usePermission();
  const [permissionStatus, setPermissionStatus] = useState<IPermission>({
    camera: "unavailable",
    location: "unavailable",
    contacts: "unavailable",
  });

  const [isContactsModalVisible, setContactsModalVisible] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await checkPermission("camera");
      const locationPermission = await checkPermission("location");
      const contactsPermission = await checkPermission("contacts");

      setPermissionStatus({
        camera: cameraPermission || "denied",
        location: locationPermission || "denied",
        contacts: contactsPermission || "denied",
      });
    };

    checkPermissions();
  }, [checkPermission]);

  requestPermission("location");
  requestPermission("camera");
  requestPermission("contacts");

  useEffect(() => {
    if (focus) {
      loadContacts(undefined);
    }
  }, [focus, loadContacts]);

  const sincroniceContact = async () => {
    if (permissionStatus.contacts === RESULTS.GRANTED) {
      console.log('melo');
      const contactsNative = await Contacts.getAll();
      console.log('melo');
      const FormatContactsNative: IContact[] = contactsNative.map(
        (contactsNatives) => {
          return {
            id: 1,
            name: contactsNatives.displayName,
            email:
              `${contactsNatives.displayName}@example.com`,
            address: {
              latitude: 6.219574005345421,
              longitude: -75.5836361669855,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            role: role.Cliente,
            phone: contactsNatives.phoneNumbers[0].number,
          };
        }
      );
      syncronize(FormatContactsNative);
      loadContacts(undefined);
      navigation.navigate('Home');
    }
  };

  if (
    permissionStatus.camera === RESULTS.UNAVAILABLE ||
    permissionStatus.contacts === RESULTS.UNAVAILABLE ||
    permissionStatus.location === RESULTS.UNAVAILABLE
  ) {
    return (
      <View style={{ margin: "auto" }}>
        <ActivityIndicator size={"large"} color={"#63626c"} />
        <Text style={{ textAlign: "center" }}>Cargando...</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate("CreateContact")}>
          <Icon name="plus" size={30} color={"#000"} />
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
              handle={() =>
                navigation.navigate("SingleContact", { contact: item })
              }
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
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonFooter}
          onPress={() => setContactsModalVisible(true)}
        >
          <Icon name={"contacts"} size={30} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isContactsModalVisible}
        onRequestClose={() => setContactsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Deseas Sincronizar Tus Contactos?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.butonImage}
                onPress={sincroniceContact}
              >
                <Text>Sincronizar Contactos</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setContactsModalVisible(false)}>
              <Text style={styles.closeModal}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
