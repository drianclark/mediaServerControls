/* eslint-disable no-bitwise */
import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import MainController from './Components/MainController';

export default function App() {
  return (
    <View style={styles.container}>
      <MainController />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    marginTop: 10,
  },
});
