/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'native-base';
import {Film, Tv} from 'react-native-feather';

export default function DownloadControls() {
  return (
    <View style={styles.container}>
      <Button warning rounded style={styles.downloadButton}>
        <Film style={styles.icon} color="black" />
        <Text style={styles.buttonText}>MOVIE</Text>
      </Button>
      <Button warning rounded style={styles.downloadButton}>
        <Tv style={styles.icon} color="black" />
        <Text style={styles.buttonText}>SHOW</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  downloadButton: {
    flex: 1,
    marginHorizontal: 10,
    height: 60,
    marginBottom: 15,
  },
  icon: {
    marginRight: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});
