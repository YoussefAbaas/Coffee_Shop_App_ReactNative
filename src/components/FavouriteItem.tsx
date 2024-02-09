import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

type Props = ((typeof CoffeeData)[number] | (typeof BeansData)[number]) & {
  ToggleFavouriteItem: Function;
};
const FavouriteItem = (props: Props) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo
        {...props}
        imageLink={props.imagelink_square}
        rating_count={props.ratings_count}
        toggleFavourite={props.ToggleFavouriteItem}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradientContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{props.description}</Text>
      </LinearGradient>
    </View>
  );
};

export default FavouriteItem;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  linearGradientContainer: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  descriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
