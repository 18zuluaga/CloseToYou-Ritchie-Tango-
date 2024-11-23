import {useContext, useEffect, useState} from 'react';
import {Snackbar, Text} from 'react-native-paper';
import {GlobalContext} from '../../hook/context/Global.context';

export const SnackbarComponent = () => {
  const {snackbar} = useContext(GlobalContext)!;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (snackbar) {
      setVisible(true);
    }
  }, [snackbar]);

  return (
    <Snackbar
      visible={visible}
      style={{
        backgroundColor: snackbar?.color,
        borderRadius: 8,
      }}
      onDismiss={() => setVisible(false)}
      duration={3000}>
      <Text style={{color: 'white'}}>{snackbar?.message}</Text>
    </Snackbar>
  );
};
