import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
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
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import {useNavigation} from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import {CreatePdfOptions, createPdf} from 'react-native-images-to-pdf';
import RNBlobUtil from 'react-native-blob-util';

const OrderHistory = () => {
  const orderHistoryList = useSelector(
    (state: RootState) => state.userListsSlice.OrderHistoryList,
  );
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const [showAnimation, setShowAnimation] = useState(false);
  const scrollViewRef = useRef<ViewShot>();
  const navigationHandler = ({
    index,
    id,
    type,
  }: {
    index: number;
    id: string;
    type: string;
  }) => {
    navigation.navigate('Details', {index, id, type});
  };

  const downloadPressHandler = async () => {
    const result =
      scrollViewRef?.current?.capture &&
      (await scrollViewRef?.current?.capture());
    const options: CreatePdfOptions = {
      pages: [{imagePath: result as string}],
      outputPath: `file://${RNBlobUtil.fs.dirs.DownloadDir}/history.pdf`,
    };

    await createPdf(options);

    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Order History" />
            {orderHistoryList.length === 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <ViewShot ref={scrollViewRef} style={styles.listItemContainer}>
                {orderHistoryList.map((data, index) => (
                  <OrderHistoryCard
                    key={index}
                    navigationHandler={navigationHandler}
                    {...data}
                  />
                ))}
              </ViewShot>
            )}
          </View>
          {orderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => {
                downloadPressHandler();
              }}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottieAnimation: {
    height: 250,
  },
  downloadButton: {
    margin: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
