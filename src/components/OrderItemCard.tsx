import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

type Props = (typeof CoffeeData)[number] | (typeof BeansData)[number];

const OrderItemCard = (props: Props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardLinearGradient}>
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardImageInfoContainer}>
          <Image source={props.imagelink_square} style={styles.image} />
          <View>
            <Text style={styles.cardTitle}>{props.name}</Text>
            <Text style={styles.cardSubTitle}>{props.special_ingredient}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.cardCurreny}>
            $ <Text style={styles.cardPrice}>{props.itemPrice}</Text>
          </Text>
        </View>
      </View>
      {props.prices.map((data, index) => (
        <View key={index.toString()} style={styles.cardTableRow}>
          <View style={styles.cardTableRow}>
            <View style={styles.sizeBoxLeft}>
              <Text
                style={[
                  styles.sizeText,
                  {
                    fontSize:
                      props.type === 'Bean'
                        ? FONTSIZE.size_12
                        : FONTSIZE.size_16,
                  },
                ]}>
                {data.size}
              </Text>
            </View>
            <View style={styles.sizeBoxRight}>
              <Text style={styles.price}>
                <Text style={styles.priceCurrency}>{data.currency}</Text>
                {data.price}
              </Text>
            </View>
          </View>
          <View style={styles.cardTableRow}>
            <Text style={styles.cardQuantity}>
              x <Text style={styles.price}>{data.quantity}</Text>
            </Text>
            <Text style={styles.cardQuantity}>
              $ {(data?.quantity * data?.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  cardLinearGradient: {
    gap: SPACING.space_20,
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImageInfoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_30,
    alignItems: 'center',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: BORDERRADIUS.radius_15,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  cardSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  cardCurreny: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  cardTableRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeBoxLeft: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.primaryGreyHex,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeBoxRight: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  priceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  cardQuantity: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
    flex: 1,
    textAlign: 'center',
  },
});
