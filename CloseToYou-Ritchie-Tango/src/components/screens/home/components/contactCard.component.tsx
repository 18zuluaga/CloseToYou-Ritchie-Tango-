import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';

interface ContactCardProps {
  name: string;
  role: string;
  styles: Record<string, any>;
  handle: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  name,
  role,
  styles,
  handle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={handle}>
      <View style={styles.contacto}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactRole}>{role}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
