import 'react-native-gesture-handler';
import './src/i18n';

import React from 'react';
import { AsyncStorage } from 'react-native';

import { MainProvider } from './src/providers/main.provider';

const readAppMode = async () => {
  const mode = await AsyncStorage.getItem('collections_mode');
  return mode === 'dark' ? 'dark' : 'light';
};

let appMode: 'light' | 'dark';

readAppMode().then(
  (mode: string) => (appMode = (mode as 'light' | 'dark') || 'light')
);

const App = () => <MainProvider appMode={appMode}></MainProvider>;

export default App;
