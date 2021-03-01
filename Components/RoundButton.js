/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default function RoundButton(props) {
  console.log(props.style);
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View>
        <Text
          style={{
            color: props.fontColor,
            fontSize: props.fontSize,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
