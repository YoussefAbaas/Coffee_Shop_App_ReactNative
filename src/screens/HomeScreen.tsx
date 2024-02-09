import {
  Dimensions,
  FlatList,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import {useNavigation} from '@react-navigation/native';
import {addToCart, calculateCardPrice} from '../store/userListsSlice';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i <= data.length; i++) {
    if (temp[data[i]?.name] === undefined) {
      temp[data[i]?.name] = 1;
    } else {
      temp[data[i]?.name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    return data.filter(item => item?.name === category);
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const CoffeeList = useSelector(
    (state: RootState) => state.userListsSlice.CoffeeList,
  );
  const BeansList = useSelector(
    (state: RootState) => state.userListsSlice.BeansList,
  );
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const listRef = useRef<FlatList>();

  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (searchText: string) => {
    if (searchText !== '') {
      listRef?.current?.scrollToOffset({animated: true, offset: 0});
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee(
        CoffeeList.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }
  };

  const resetSearch = () => {
    listRef?.current?.scrollToOffset({animated: true, offset: 0});
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee(CoffeeList);
    setSearchText('');
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <HeaderBar />
        <Text style={styles.screenTitle}>
          Find the best{'\n'}coffee for you
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText?.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              style={styles.inputIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee"
            value={searchText}
            onChangeText={value => {
              setSearchText(value);
              searchCoffee(searchText);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInput}
          />
          {searchText?.length > 0 ? (
            <TouchableOpacity onPress={resetSearch}>
              <CustomIcon
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categories.map((data, index) => (
            <View key={index} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryScrollViewItem}
                onPress={() => {
                  listRef?.current?.scrollToOffset({animated: true, offset: 0});
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffee(getCoffeeList(categories[index], CoffeeList));
                }}>
                <Text
                  style={[
                    styles.categoryTextActive,
                    categoryIndex.index === index
                      ? {
                          color: COLORS.primaryOrangeHex,
                        }
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index === index ? (
                  <View style={styles.activeCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <FlatList
          ref={listRef}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No Coffee Found</Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', {...item})}>
                <CoffeeCard
                  {...item}
                  buttonPressHandler={() => {
                    dispatch(
                      addToCart({
                        ...item,
                        prices: [{...item.prices[0], quantity: 1}],
                      }),
                    );
                    dispatch(calculateCardPrice());
                    ToastAndroid.showWithGravity(
                      `${item.name} added to card`,
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeansList}
          contentContainerStyle={[
            styles.flatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', {...item})}>
                <CoffeeCard
                  {...item}
                  buttonPressHandler={() => {
                    dispatch(
                      addToCart({
                        ...item,
                        prices: [{...item.prices[0], quantity: 1}],
                      }),
                    );
                    dispatch(calculateCardPrice());
                    ToastAndroid.showWithGravity(
                      `${item.name} added to card`,
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryTextActive: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  categoryScrollViewItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_18,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  closeIcon: {
    marginHorizontal: SPACING.space_10,
  },
  emptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 2,
  },
  emptyListText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});
