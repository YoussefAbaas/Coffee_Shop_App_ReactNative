/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import OrderHistory from '../screens/OrderHistory';
import CustomIcon from '../components/CustomIcon';
import {COLORS} from '../theme/theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.blurViewStyle}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="home"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="cart"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="like"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="bell"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
