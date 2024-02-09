import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import {ScrollView} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {useNavigation} from '@react-navigation/native';
import {addToFavourite, deleteFromFavourite} from '../store/userListsSlice';
import FavouriteItem from '../components/FavouriteItem';

const FavouritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favouritesList = useSelector(
    (state: RootState) => state.userListsSlice.FavouritesList,
  );
  const height = useBottomTabBarHeight();

  const toggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite
      ? dispatch(deleteFromFavourite({type, id}))
      : dispatch(addToFavourite({type, id}));
  };
  console.log('length is', favouritesList.length);
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={[styles.scrollViewInnerContainer, {marginBottom: height}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Favourites" />
            {favouritesList.length === 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.listItemContainer}>
                {favouritesList.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('Details', {...item});
                    }}>
                    <FavouriteItem
                      {...item}
                      ToggleFavouriteItem={toggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavouritesScreen;

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
