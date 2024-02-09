import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import LottieView, {AnimationObject} from 'lottie-react-native';

interface Props {
  style: ViewStyle;
  source:
    | string
    | AnimationObject
    | {
        uri: string;
      };
}

const PopUpAnimation = (props: Props) => {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        source={props.source}
        style={props.style}
        autoPlay
        loop={false}
      />
    </View>
  );
};

export default PopUpAnimation;

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: 'center',
  },
});
