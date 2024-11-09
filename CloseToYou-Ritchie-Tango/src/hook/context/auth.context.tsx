import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthContextType {
  token: string;
  saveToken: (token: string) => void;
  removeToken: () => void;
  isLoading: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('userToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  };

  const saveToken = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving token to AsyncStorage', error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken('');
    } catch (error) {
      console.error('Error removing token from AsyncStorage', error);
    }
  };

  return (
    <AuthContext.Provider value={{token, saveToken, removeToken, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
