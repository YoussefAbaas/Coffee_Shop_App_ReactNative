import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import CustomIcon from './CustomIcon';

type Props = ((typeof CoffeeData)[number] | (typeof BeansData)[number]) & {
  incrementQuantityHandler: Function;
  decrementQuantityHandler: Function;
};

const CardItem = (props: Props) => {
  return (
    <View style={{}}>
      {props.prices.length !== 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cardItemLinearGradient}>
          <View style={styles.cardItemRow}>
            <Image
              source={props.imagelink_square}
              style={styles.cardItemImage}
            />
            <View style={styles.cardItemInfo}>
              <View>
                <Text style={styles.cardItemTitle}>{props.name}</Text>
                <Text style={styles.cardItemSubTitle}>
                  {props.special_ingredient}
                </Text>
              </View>
              <View style={styles.itemRoastedContainer}>
                <Text style={styles.itemRoastedText}>{props.roasted}</Text>
              </View>
            </View>
          </View>
          {props.prices.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.cardItemSizeRowContainer}>
              <View style={styles.cardItemSizeContainer}>
                <View style={styles.sizeBox}>
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
                <Text style={styles.sizeCurrency}>
                  {data.currency}
                  <Text style={styles.sizePrice}>{data.price}</Text>
                </Text>
              </View>
              <View style={styles.cardItemSizeContainer}>
                <TouchableOpacity
                  style={styles.cardItemButton}
                  onPress={() => {
                    props.decrementQuantityHandler({
                      id: props.id,
                      size: data.size,
                    });
                  }}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.cardItemQuantityContainer}>
                  <Text style={styles.cardItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cardItemButton}
                  onPress={() => {
                    props.incrementQuantityHandler({
                      id: props.id,
                      size: data.size,
                    });
                  }}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cardItemSingleLinearGradient}>
          <View style={styles.cardItemRow}>
            <Image
              source={props.imagelink_square}
              style={styles.cardItemSingleImage}
            />
            <View style={styles.cardItemSingleInfo}>
              <View>
                <Text style={styles.cardItemTitle}>{props.name}</Text>
                <Text style={styles.cardItemSubTitle}>
                  {props.special_ingredient}
                </Text>
              </View>
              {props.prices.map((data, index) => (
                <View
                  key={index.toString()}
                  style={[
                    styles.cardItemSizeRowContainer,
                    {flexDirection: 'column'},
                  ]}>
                  <View style={styles.cardItemSingleSizeContainer}>
                    <View style={styles.sizeBox}>
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
                    <Text style={styles.sizeCurrency}>
                      {data.currency}
                      <Text style={styles.sizePrice}>{data.price}</Text>
                    </Text>
                  </View>
                  <View style={styles.cardItemSingleSizeContainer}>
                    <TouchableOpacity
                      style={styles.cardItemButton}
                      onPress={() => {
                        props.decrementQuantityHandler({
                          id: props.id,
                          size: data.size,
                        });
                      }}>
                      <CustomIcon
                        name="minus"
                        color={COLORS.primaryWhiteHex}
                        size={FONTSIZE.size_10}
                      />
                    </TouchableOpacity>
                    <View style={styles.cardItemQuantityContainer}>
                      <Text style={styles.cardItemQuantityText}>
                        {data.quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.cardItemButton}
                      onPress={() => {
                        props.incrementQuantityHandler({
                          id: props.id,
                          size: data.size,
                        });
                      }}>
                      <CustomIcon
                        name="add"
                        color={COLORS.primaryWhiteHex}
                        size={FONTSIZE.size_10}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  cardItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  cardItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  cardItemSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  itemRoastedContainer: {
    height: 50,
    width: 100 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  itemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  cardItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardItemSizeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  sizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  cardItemButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  cardItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 80,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  cardItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  cardItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  cardItemSingleInfo: {
    flex: 1,
    gap: SPACING.space_4,
  },
  cardItemSingleSizeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: SPACING.space_12,
  },
});
