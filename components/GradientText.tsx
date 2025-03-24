import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientTextProps extends TextProps {
  children: ReactNode;
  style?: TextStyle;
}

const GradientText = ({ children, style, ...rest }: GradientTextProps) => {
  return (
    <MaskedView
      maskElement={
        <Text style={style} {...rest}>
          {children}
        </Text>
      }>
      <LinearGradient
        colors={["#DC2626", "#FDE047", "#22C55E", "#1D4ED8", "#6B21A8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={[style, { opacity: 0 }]} {...rest}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;