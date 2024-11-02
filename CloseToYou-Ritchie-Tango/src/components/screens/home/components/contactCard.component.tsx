import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import { Contact } from '../../../../interface/contact.interface';

interface ContactCardProps {
  item: Contact
  styles: Record<string, any>;
  handle: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  item,
  styles,
  handle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={handle}>
      <View style={styles.contacto}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactRole}>{item.role}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
