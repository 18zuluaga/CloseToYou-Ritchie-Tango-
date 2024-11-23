import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../screens/createContact/css/creteContact.styles';

interface ModalNoPermissionProps {
  setModalVisible: (visible: boolean) => void;
}

export const ModalNoPermission: React.FC<ModalNoPermissionProps> = ({
  setModalVisible,
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          Permisos Denegados
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={styles.closeModal}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
