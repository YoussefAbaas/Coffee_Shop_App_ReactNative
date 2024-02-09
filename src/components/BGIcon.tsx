import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface Props {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon = (props: Props) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: props.BGColor}]}>
      <CustomIcon name={props.name} color={props.color} size={props.size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
