import {createSlice} from '@reduxjs/toolkit';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const userListsSlice = createSlice({
  name: 'userListSlice',
  initialState: {
    applyPercentageChange: false,
    CoffeeList: CoffeeData,
    BeansList: BeansData,
    FavouritesList: [],
    CartList: [] as typeof CoffeeData | typeof BeansData,
    OrderHistoryList: [] as {
      OrderDate: string;
      CartList: typeof CoffeeData | typeof BeansData;
      CartListPrice: string;
    }[],
    CartPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      let found = false;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === action.payload.id) {
          found = true;
          let size = false;
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (
              state.CartList[i].prices[j].size === action.payload.prices[0].size
            ) {
              size = true;
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
          if (size === false) {
            state.CartList[i].prices.push(action.payload.prices[0]);
          }
          state.CartList[i].prices.sort((a, b) => {
            if (a.size > b.size) {
              return -1;
            }
            if (a.size < b.size) {
              return 1;
            }
            return 0;
          });
          break;
        }
      }
      if (found === false) {
        state.CartList.push(action.payload);
      }
    },
    calculateCardPrice: state => {
      let totalPrice = 0;
      for (let i = 0; i < state.CartList.length; i++) {
        let tempPrice = 0;
        console.log('temp price is', tempPrice);
        for (let j = 0; j < state.CartList[i].prices.length; j++) {
          tempPrice =
            tempPrice +
            parseFloat(state.CartList[i].prices[j].price) *
              state.CartList[i].prices[j].quantity;
        }
        state.CartList[i].itemPrice = tempPrice.toFixed(2).toString();
        totalPrice = totalPrice + tempPrice;
      }
      state.CartPrice = totalPrice.toFixed(2).toString();
    },
    addToFavourite: (state, action) => {
      if (action.payload.type === 'Coffee') {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id === action.payload.id) {
            if (!state.CoffeeList[i].favourite) {
              state.CoffeeList[i].favourite = true;
              state.FavouritesList.unshift(state.CoffeeList[i]);
            }
            break;
          }
        }
      } else if (action.payload.type === 'Bean') {
        for (let i = 0; i < state.BeansList.length; i++) {
          if (state.BeansList[i].id === action.payload.id) {
            if (!state.BeansList[i].favourite) {
              state.BeansList[i].favourite = true;
              state.FavouritesList.unshift(state.BeansList[i]);
            }
            break;
          }
        }
      }
    },
    deleteFromFavourite: (state, action) => {
      if (action.payload.type === 'Coffee') {
        for (let i = 0; i < state.CoffeeList.length; i++) {
          if (state.CoffeeList[i].id === action.payload.id) {
            if (state.CoffeeList[i].favourite) {
              state.CoffeeList[i].favourite = false;
            }
            break;
          }
        }
      } else if (action.payload.type === 'Bean') {
        for (let i = 0; i < state.BeansList.length; i++) {
          if (state.BeansList[i].id === action.payload.id) {
            if (state.BeansList[i].favourite) {
              state.BeansList[i].favourite = false;
            }
            break;
          }
        }
      }
      let spliceIndex = -1;
      for (let i = 0; i < state.FavouritesList.length; i++) {
        if (state.FavouritesList[i].id === action.payload.id) {
          spliceIndex = i;
          break;
        }
      }
      state.FavouritesList.splice(spliceIndex, 1);
    },
    incrementCardQuantity: (state, action) => {
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === action.payload.id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size === action.payload.size) {
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    decrementCartQuantity: (state, action) => {
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === action.payload.id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size === action.payload.size) {
              if (state.CartList[i].prices.length > 1) {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList[i].prices.splice(j, 1);
                }
              } else {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
              }
              break;
            }
          }
        }
      }
    },
    addToOrderHistory: state => {
      let temp = state.CartList.reduce(
        (accumlator: number, currentValue) =>
          accumlator + parseFloat(currentValue.itemPrice),
        0,
      );
      let currentTotalPrice = temp.toFixed(2).toString();
      if (state.OrderHistoryList.length > 0) {
        state.OrderHistoryList.unshift({
          OrderDate:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: currentTotalPrice,
        });
      } else {
        state.OrderHistoryList.push({
          OrderDate:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: currentTotalPrice,
        });
      }
      state.CartList = [];
    },
  },
});

export const {
  addToCart,
  calculateCardPrice,
  addToFavourite,
  deleteFromFavourite,
  incrementCardQuantity,
  decrementCartQuantity,
  addToOrderHistory,
} = userListsSlice.actions;

export default userListsSlice.reducer;
