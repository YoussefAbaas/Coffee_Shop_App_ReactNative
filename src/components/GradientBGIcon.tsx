import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface Props {
  name: string;
  color: string;
  size: number;
}

const GradientBGIcon = (props: Props) => {
  return (
    <View style={styles.iconContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradientBG}>
        <CustomIcon name={props.name} size={props.size} color={props.color} />
      </LinearGradient>
    </View>
  );
};

export default GradientBGIcon;

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  linearGradientBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
