import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GradientBGIcon from './GradientBGIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface Props {
  enableBackHandler: boolean;
  imageLink: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  specialIngredient: string;
  ingredients: string;
  average_rating: number;
  rating_count: string;
  roasted: string;
  backHandler?: Function;
  toggleFavourite: Function;
}

const ImageBackgroundInfo = (props: Props) => {
  return (
    <View>
      <ImageBackground source={props.imageLink} style={styles.ImageBackground}>
        <View
          style={[
            styles.imageHeaderBar,
            !props.enableBackHandler && {justifyContent: 'flex-end'},
          ]}>
          {props.enableBackHandler && (
            <TouchableOpacity
              onPress={() => {
                props.backHandler && props.backHandler();
              }}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              props.toggleFavourite(props.favourite, props.type, props.id);
            }}>
            <GradientBGIcon
              name="like"
              color={
                props.favourite
                  ? COLORS.primaryRedHex
                  : COLORS.primaryLightGreyHex
              }
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageInfoContainer}>
          <View style={styles.imageInfoInnerContainer}>
            <View style={styles.infoContainerRow}>
              <View>
                <Text style={styles.itemTitleText}>{props.name}</Text>
                <Text style={styles.itemSubtitleText}>
                  {props.specialIngredient}
                </Text>
              </View>
              <View style={styles.itemInfoContainer}>
                <View style={styles.properFirst}>
                  <CustomIcon
                    name={props.type === 'Bean' ? 'bean' : 'beans'}
                    size={
                      props.type === 'Bean'
                        ? FONTSIZE.size_18
                        : FONTSIZE.size_24
                    }
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.propertyTextFirst,
                      {
                        marginTop:
                          props.type === 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {props.type}
                  </Text>
                </View>
                <View style={styles.properFirst}>
                  <CustomIcon
                    name={props.type === 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={[styles.propertyTextLast]}>
                    {props.ingredients}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainerRow}>
              <View style={styles.ratingContainer}>
                <CustomIcon
                  name="star"
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={styles.ratingText}>{props.average_rating}</Text>
                <Text
                  style={
                    styles.ratingCountText
                  }>{`{${props.rating_count}}`}</Text>
              </View>
              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{props.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  imageHeaderBar: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageInfoContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
  },
  imageInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_30,
  },
  infoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  itemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  itemInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  properFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  propertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  propertyTextLast: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_4 + SPACING.space_2,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  ratingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  roastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
});
