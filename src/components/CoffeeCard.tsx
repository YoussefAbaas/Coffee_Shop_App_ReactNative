import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CoffeeData from '../data/CoffeeData';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

type CoffeeCardProp = (typeof CoffeeData)[0] & {buttonPressHandler: Function};

const CoffeeCard = (props: CoffeeCardProp) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={props.imagelink_square}
        style={styles.cardImageBackground}
        resizeMode="cover">
        <View style={styles.ratingContainer}>
          <CustomIcon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.ratingText}>{props.average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{props.name}</Text>
      <Text style={styles.cardSubTitle}>{props.special_ingredient}</Text>
      <View style={styles.cardFooterRow}>
        <Text style={styles.cardPriceCurrency}>
          $<Text style={styles.cardPrice}>{props.prices[0].price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.buttonPressHandler && props.buttonPressHandler();
          }}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name="add"
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImageBackground: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderBottomRightRadius: BORDERRADIUS.radius_20,
    right: 0,
    top: 0,
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    lineHeight: SPACING.space_20 + 2,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.space_15,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  cardSubTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  cardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
});
