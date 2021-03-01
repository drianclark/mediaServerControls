/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Power} from 'react-native-feather';

export default function StartButton(props) {
  return (
    <View
      style={{
        borderRadius: props.borderRadius,
        borderWidth: props.borderWidth,
        padding: props.padding,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        backgroundColor: '#64dd17',
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <Power stroke="white" />
      </TouchableOpacity>
    </View>
  );
}
