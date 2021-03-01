/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {RefreshCw} from 'react-native-feather';

export default function RefreshButton(props) {
  return (
    <View
      style={{
        borderRadius: props.borderRadius,
        borderWidth: props.borderWidth,
        padding: props.padding,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <RefreshCw stroke="white" />
      </TouchableOpacity>
    </View>
  );
}
