import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import {ScrollView} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import {useNavigation} from '@react-navigation/native';
import CardItem from '../components/CardItem';
import {
  calculateCardPrice,
  decrementCartQuantity,
  incrementCardQuantity,
} from '../store/userListsSlice';

const CartScreen = () => {
  const cardList = useSelector(
    (state: RootState) => state.userListsSlice.CartList,
  );
  const cardPrice = useSelector(
    (state: RootState) => state.userListsSlice.CartPrice,
  );

  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();

  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[
            styles.scrollViewInnerContainer,
            {marginBottom: tabBarHeight},
          ]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Card" />
            {cardList.length === 0 ? (
              <EmptyListAnimation title={'Card is empty'} />
            ) : (
              <View style={styles.listItemContainer}>
                {cardList.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('Details', {...item});
                    }}>
                    <CardItem
                      {...item}
                      decrementQuantityHandler={data => {
                        dispatch(decrementCartQuantity(data));
                        dispatch(calculateCardPrice());
                      }}
                      incrementQuantityHandler={data => {
                        dispatch(incrementCardQuantity(data));
                        dispatch(calculateCardPrice());
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {cardList.length !== 0 ? (
            <PaymentFooter
              pressHandler={() => {
                navigation.navigate('Payment', {
                  price: cardPrice,
                  currency: '$',
                });
              }}
              buttonTitle="Pay"
              price={{price: cardPrice, currency: '$'}}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
