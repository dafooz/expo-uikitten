import * as Font from 'expo-font';

export const loadApplicationFonts = async () => {
  await Font.loadAsync({
    // desired font like:
    // primary: require('../../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  });
};
