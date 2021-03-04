/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {RefreshCw, Power} from 'react-native-feather';

export default function PowerControls(props) {
  useEffect(() => {
    console.log(props.status);
  }, []);

  return (
    <View style={styles.powerControls}>
      <Button
        rounded
        onPress={props.refreshStatus}
        style={styles.refreshButton}>
        <RefreshCw stroke="white" />
      </Button>
      {props.status === 'off' && (
        <Button
          rounded
          success
          style={styles.startButton}
          onPress={props.startServer}>
          <Power stroke="white" />
        </Button>
      )}

      {props.status === 'on' && (
        <Button
          rounded
          danger
          style={styles.stopButton}
          onPress={props.shutdownServer}>
          <Power stroke="white" />
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  powerControls: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  refreshButton: {
    flex: 1,
    marginRight: 10,
    height: 60,
  },
  startButton: {
    flex: 2,
    marginLeft: 10,
    height: 60,
  },
  stopButton: {
    flex: 2,
    marginLeft: 10,
    height: 60,
  },
});
