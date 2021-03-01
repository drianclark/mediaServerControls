import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RoundButton from './RoundButton';

export default function DownloadOptions() {
  return (
    <View>
      <RoundButton
        text="Download Movie"
        style={styles.button}
        fontColor="white"
        fontSize={17}
      />
      <RoundButton
        text="Download Show"
        style={styles.button}
        fontColor="white"
        fontSize={17}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffab00',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    color: 'white',
  },
});
