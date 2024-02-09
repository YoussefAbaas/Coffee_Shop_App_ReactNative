import React, {useEffect} from 'react';
import DetailsScreen from './src/screens/DetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import SplashScreen from 'react-native-splash-screen';

const stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
          <stack.Navigator screenOptions={{headerShown: false}}>
            <stack.Screen
              name="Tab"
              component={TabNavigator}
              options={{animation: 'slide_from_bottom'}}
            />
            <stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{animation: 'slide_from_bottom'}}
            />
            <stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{animation: 'slide_from_bottom'}}
            />
          </stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
};

export default App;
