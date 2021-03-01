/* eslint-disable no-bitwise */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import dgram from 'react-native-udp';
import SSH from 'react-native-ssh';
import Config from 'react-native-config';
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
