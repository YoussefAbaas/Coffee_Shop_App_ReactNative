import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PaymentFooter from '../components/PaymentFooter';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import PaymentItem from '../components/PaymentItem';
import GradientBGIcon from '../components/GradientBGIcon';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import {useDispatch} from 'react-redux';
import {addToOrderHistory, calculateCardPrice} from '../store/userListsSlice';
import PopUpAnimation from '../components/PopUpAnimation';

const paymentList = [
  {
    name: 'Wallet',
    icon: 'wallet',
    isIcon: true,
    paymentPrice: '$100.5',
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonPressHandler = () => {
    setShowAnimation(true);
    dispatch(addToOrderHistory());
    dispatch(calculateCardPrice());
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('OrderHistory');
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payments</Text>
          <View />
        </View>
        <View style={styles.paymentMethodsContainer}>
          <TouchableOpacity onPress={() => setPaymentMethod('Credit Card')}>
            <View
              style={[
                styles.creditCardContainer,
                {
                  borderColor:
                    paymentMethod === 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.creditCardTitle}>Credit Card</Text>
              <View style={styles.creditCardBackground}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.linearGradientStyle}>
                  <View style={styles.creditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.creditCardNumberContainer}>
                    <Text style={styles.cardNumber}>{2874}</Text>
                    <Text style={styles.cardNumber}>{2498}</Text>
                    <Text style={styles.cardNumber}>{1879}</Text>
                    <Text style={styles.cardNumber}>{6143}</Text>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardNameContainer}>
                      <Text style={styles.creditCardNameTitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.creditCardNameSubTitle}>
                        Youssef Abbas
                      </Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.creditCardNameTitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.creditCardNameSubTitle}>09/27</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {paymentList.map(item => (
            <TouchableOpacity onPress={() => setPaymentMethod(item.name)}>
              <PaymentItem {...item} paymentMethod={paymentMethod} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={'Pay from ' + paymentMethod}
        price={route.params}
        pressHandler={buttonPressHandler}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    marginRight: 10,
  },
  paymentMethodsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  creditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  creditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  creditCardBackground: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  linearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  creditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  cardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  creditCardNameContainer: {
    alignItems: 'flex-start',
  },
  creditCardDateContainer: {
    alignItems: 'flex-end',
  },
  creditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  creditCardNameSubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  lottieAnimation: {
    flex: 1,
  },
});
