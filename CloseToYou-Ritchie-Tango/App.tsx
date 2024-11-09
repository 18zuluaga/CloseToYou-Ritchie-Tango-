import React from 'react';
import { AuthProvider } from './src/hook/context/auth.context';
import { NavigationCont } from './src/navigation/app.container.navigation';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationCont/>
    </AuthProvider>
  );
};

export default App;
