import React from 'react';
import { NavigationCont } from './src/navigation/app.container.navigation';
import { SnackbarComponent } from './src/components/common/snackbar.component';
import { GlobalProvider } from './src/hook/context/Global.context';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <NavigationCont />
        <SnackbarComponent />
      </GlobalProvider>
    </SafeAreaProvider>
  );
};

export default App;
