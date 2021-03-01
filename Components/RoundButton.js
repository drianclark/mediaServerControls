import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default function RoundButton(props) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        borderRadius: props.borderRadius,
        borderWidth: props.borderWidth,
        padding: props.padding,
        borderColor: props.borderColor,
        backgroundColor: props.backgroundColor,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        flex: 1,
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={{color: props.color, textAlign: 'center'}}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
