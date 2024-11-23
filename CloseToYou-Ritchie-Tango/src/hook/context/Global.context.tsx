import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISnackbar } from "../../interface/interface";
import { IUser } from "../../interface/user.interface";
import { axiosBackend, axiosBackendMultipart } from "../../config/axios.config";

interface GlobalContextType {
  token: IUser | undefined;
  saveToken: (token: IUser | undefined) => void;
  removeToken: () => void;
  isLoading: boolean;
  snackbar: ISnackbar | undefined;
  setSnackbar: (snackbar: ISnackbar) => void;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [token, setToken] = useState<IUser | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<ISnackbar | undefined>();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("userToken");
    if (storedToken) {
      const parseToken: IUser = JSON.parse(storedToken);
      axiosBackend.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parseToken.token}`;
      axiosBackendMultipart.defaults.headers.common[
        `Authorization`
      ] = `Bearer ${parseToken.token}`;
      setToken(parseToken);
    }
    setIsLoading(false);
  };

  const saveToken = async (newToken: IUser | undefined) => {
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(newToken));
      setToken(newToken);
    } catch (error) {
      console.error("Error saving token to AsyncStorage", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setToken(undefined);
    } catch (error) {
      console.error("Error removing token from AsyncStorage", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        token,
        saveToken,
        removeToken,
        isLoading,
        snackbar,
        setSnackbar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
