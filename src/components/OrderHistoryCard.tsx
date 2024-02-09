import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderItemCard from './OrderItemCard';

interface Props {
  OrderDate: string;
  CartList: typeof CoffeeData | typeof BeansData;
  CartListPrice: string;
  navigationHandler: Function;
}

const OrderHistoryCard = (props: Props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerTitle}>Order Time</Text>
          <Text style={styles.headerSubTitle}>{props.OrderDate}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerAmountSubTitle}>
            $ {props.CartListPrice}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {props.CartList.map((data, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => {
              props.navigationHandler({
                index: index,
                id: data.id,
                type: data.type,
              });
            }}>
            <OrderItemCard {...data} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    gap: SPACING.space_10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  headerSubTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  headerAmountSubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  listContainer: {
    gap: SPACING.space_20,
  },
});
