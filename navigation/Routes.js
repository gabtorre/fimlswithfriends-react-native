import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Firebase from '../firebase';
import {AuthContext} from './AuthProvider';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';


const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = Firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(220, 53, 69)',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(28, 28, 30)',
    border: '#181e2f',
    notification: 'rgb(255, 69, 58)',
  },
};

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
