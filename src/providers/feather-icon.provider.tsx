import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const createIconsMap = () => {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    }
  );
};

const IconProvider = (name: string | number | symbol) => ({
  toReactElement: (props: any) => FeatherIcon({ name, ...props }),
});

const FeatherIcon = ({ name, style }: { name: any; style: any }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};
