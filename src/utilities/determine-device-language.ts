// @ts-ignore
import detectBrowserLanguage from 'detect-browser-language';
import { NativeModules, Platform } from 'react-native';

export const determineDeviceLanguage = () => {
  let deviceLanguage: string | undefined;
  switch (Platform.OS) {
    case 'ios':
      deviceLanguage =
        NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]; //iOS 13
      break;
    case 'android':
      deviceLanguage = NativeModules.I18nManager.localeIdentifier;
      break;
    case 'web':
      deviceLanguage = detectBrowserLanguage();
      break;
  }

  if (deviceLanguage) {
    switch (deviceLanguage.slice(0, 2).toLowerCase()) {
      case 'fr':
        return 'fr';
      default:
        return 'en';
    }
  }
  return 'en';
};
