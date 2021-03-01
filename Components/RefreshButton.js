/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {RefreshCw} from 'react-native-feather';

export default function RefreshButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
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
      <View>
        <RefreshCw stroke="white" />
      </View>
    </TouchableOpacity>
  );
}
