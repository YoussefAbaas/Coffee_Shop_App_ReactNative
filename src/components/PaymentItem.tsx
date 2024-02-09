import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface Props {
  name: string;
  icon: ImageProps | string;
  isIcon: boolean;
  paymentPrice?: string;
  paymentMethod: string;
}
const PaymentItem = (props: Props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={[
        styles.linearGradientContainer,
        {
          borderColor:
            props.paymentMethod === props.name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}>
      <View style={styles.IconContainer}>
        {props.isIcon ? (
          <CustomIcon
            style={styles.icon}
            name={props.icon as string}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_30}
          />
        ) : (
          <Image style={styles.image} source={props.icon as ImageProps} />
        )}
        <Text style={styles.name}>{props.name}</Text>
      </View>
      {props.paymentPrice && (
        <Text style={styles.paymentPrice}>{props.paymentPrice}</Text>
      )}
    </LinearGradient>
  );
};

export default PaymentItem;

const styles = StyleSheet.create({
  linearGradientContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  IconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  image: {
    width: SPACING.space_30,
    height: SPACING.space_30,
    objectFit: 'cover',
  },
  name: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  icon: {
    //marginHorizontal: SPACING.space_10,
  },
  paymentPrice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
});
