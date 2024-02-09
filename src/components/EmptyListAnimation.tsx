import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

interface Props {
  title: string;
}

const EmptyListAnimation = (props: Props) => {
  return (
    <View style={styles.emptyCardContainer}>
      <LottieView
        style={styles.lottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
  emptyCardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lottieStyle: {
    height: 300,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});
