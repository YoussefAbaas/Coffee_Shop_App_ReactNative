import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {StatusBar} from 'react-native';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  addToFavourite,
  calculateCardPrice,
  deleteFromFavourite,
} from '../store/userListsSlice';
import {RootState} from '../store/store';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = useSelector((state: RootState) =>
    route?.params?.type === 'Coffee'
      ? state.userListsSlice.CoffeeList
      : state.userListsSlice.BeansList,
  )[route?.params?.index];
  const dispatch = useDispatch();

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(item.prices[0]);

  const toggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite
      ? dispatch(deleteFromFavourite({type, id}))
      : dispatch(addToFavourite({type, id}));
  };
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          imageLink={item.imagelink_portrait}
          type={item.type}
          id={item.id}
          favourite={item.favourite}
          name={item.name}
          specialIngredient={item.special_ingredient}
          ingredients={item.ingredients}
          average_rating={item.average_rating}
          rating_count={item.ratings_count}
          roasted={item.roasted}
          backHandler={() => {
            navigation.goBack();
          }}
          toggleFavourite={toggleFavourite}
        />
        <View style={styles.footerInfoContainer}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text numberOfLines={3} style={styles.descriptionText}>
                {item.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.infoTitle}>Size</Text>
          <View style={styles.sizeOuterContainer}>
            {item.prices.map((data: any) => {
              return (
                <TouchableOpacity
                  onPress={() => setPrice(data)}
                  key={data.size}
                  style={[
                    styles.sizeButton,
                    {
                      borderColor:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          item.type === 'bean'
                            ? FONTSIZE.size_14
                            : FONTSIZE.size_16,
                        color:
                          data.size === price.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.primaryLightGreyHex,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add To Card"
          pressHandler={async () => {
            await dispatch(
              addToCart({...item, prices: [{...price, quantity: 1}]}),
            );
            await dispatch(calculateCardPrice());
            navigation.navigate('Cart');
          }}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  footerInfoContainer: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizeButton: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
