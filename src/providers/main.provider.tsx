import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { AsyncStorage, SafeAreaView, StatusBar } from 'react-native';

import {
  dark as EvaDarkTheme,
  light as EvaLightTheme,
  mapping,
} from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { StorageKeys } from '../../storage-keys';
import { extendedTheme } from '../ui/extended-theme';
// import { default as customMapping } from '../ui/mapping.json';
import { determineDeviceLanguage, loadApplicationFonts } from '../utilities';
import { FeatherIconsPack } from './feather-icon.provider';

const lightTheme = { ...EvaLightTheme, ...extendedTheme };
const darkTheme = { ...EvaDarkTheme, ...extendedTheme };

export type MainContextType = {
  appIsReady: boolean;
  appMode: {
    mode: 'light' | 'dark';
    switchMode: () => void;
  };
  theme: any;
};

export const MainContext = createContext<MainContextType>({
  appIsReady: false,
  appMode: {
    mode: 'light',
    switchMode: () => {},
  },
  theme: lightTheme,
});

const MainProvider: FC<{ appMode: 'light' | 'dark' }> = ({ appMode }) => {
  const [appDisplayMode, setAppDisplayMode] = useState<'light' | 'dark'>(
    appMode
  );

  const { i18n } = useTranslation('application', {
    useSuspense: false,
  });
  const [translationsLoaded, setTranlsationsLoaded] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [theme, setTheme] = useState(
    appMode === 'dark' ? darkTheme : lightTheme
  );

  const loadLanguage = useCallback(async () => {
    await i18n.changeLanguage(determineDeviceLanguage());
    setTranlsationsLoaded(true);
  }, []);

  const loadFonts = useCallback(async () => {
    if (translationsLoaded) {
      await loadApplicationFonts();
      setAppIsReady(true);
    }
  }, [translationsLoaded]);

  const switchAppMode = () => {
    setAppDisplayMode((previousMode: 'light' | 'dark') => {
      setTheme(previousMode === 'dark' ? lightTheme : darkTheme);
      const newMode = previousMode === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(StorageKeys.displayMode, newMode);
      return newMode;
    });
  };

  useEffect(() => {
    loadLanguage();
    loadFonts();
  }, [loadLanguage, loadFonts]);

  return (
    <MainContext.Provider
      value={{
        appIsReady,
        appMode: {
          mode: appDisplayMode,
          switchMode: switchAppMode,
        },
        theme,
      }}>
      <IconRegistry icons={[EvaIconsPack, FeatherIconsPack]} />
      <StatusBar
        barStyle={appDisplayMode === 'light' ? 'dark-content' : 'light-content'}
      />
      <ApplicationProvider
        mapping={mapping}
        // customMapping={customMapping}
        theme={theme}>
        {appIsReady ? (
          <SafeAreaView>
            <Layout>
              <AppLoaded />
            </Layout>
          </SafeAreaView>
        ) : (
          <SafeAreaView>
            <Layout>
              <AppLoading />
            </Layout>
          </SafeAreaView>
        )}
      </ApplicationProvider>
    </MainContext.Provider>
  );
};

const useAppContext = () => {
  const context = React.useContext(MainContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a MainProvider');
  }
  return context;
};

// Components showcasing the use of the translation hook
const AppLoaded: FC = () => {
  const { t } = useTranslation();
  return <Text category='h6'>{t('app_info')}</Text>;
};

const AppLoading: FC = () => {
  const { t } = useTranslation();
  return <Text category='h6'>{t('loading')}</Text>;
};

export { MainProvider, useAppContext };
