import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface PriceProps {
  price: string;
  currency: string;
}

interface FooterProps {
  price: PriceProps;
  pressHandler: Function;
  buttonTitle: string;
}

const PaymentFooter = (props: FooterProps) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceTitle}>Price</Text>
        <Text style={styles.priceText}>
          {props.price.currency}{' '}
          <Text style={styles.price}>{props.price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.pressHandler()}>
        <Text style={styles.buttonText}>{props.buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  priceContainer: {
    alignItems: 'center',
    width: 100,
  },
  priceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  button: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
