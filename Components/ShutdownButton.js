/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Power} from 'react-native-feather';

export default function ShutdownButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderRadius: props.borderRadius,
        borderWidth: props.borderWidth,
        padding: props.padding,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        backgroundColor: '#d50000',
        alignItems: 'center',
        flex: 1,
      }}>
      <View>
        <Power stroke="white" />
      </View>
    </TouchableOpacity>
  );
}
