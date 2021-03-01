/* eslint-disable no-bitwise */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import dgram from 'react-native-udp';
import SSH from 'react-native-ssh';
import Config from 'react-native-config';
import RoundButton from './RoundButton';
import StartButton from './StartButton';
import RefreshButton from './RefreshButton';
import ShutdownButton from './ShutdownButton';
import DownloadOptions from './DownloadOptions';

const SSH_CONFIG = {
  user: Config.SSH_USER,
  host: Config.SSH_HOST,
  password: Config.SSH_PASSWORD,
};

function pingMediaServer() {
  let command = 'true';

  return SSH.execute(SSH_CONFIG, command).then(
    (result) => result,
    (error) => error,
  );
}

function randomPort() {
  return (Math.random() * 60536) | (0 + 5000); // 60536-65536
}

function read_mac_address() {
  return 'f0:de:f1:bc:54:14';
}

function constructMagicPacket() {
  let mac = read_mac_address();

  let split_mac = mac.split(':');
  let decimal_mac = [];

  split_mac.forEach((hex) => {
    decimal_mac.push(parseInt(hex, 16).toString());
  });

  let ff_part = new Array(6).fill('255');
  let mac_part = new Array(16).fill(decimal_mac).flat();
  let magicPacket = ff_part.concat(mac_part);

  return magicPacket;
}

function sendMagicPacket() {
  let magicPacket = constructMagicPacket();
  let port = 60536;
  let address = '255.255.255.255';

  let socket = dgram.createSocket('udp4');
  socket.bind(randomPort());

  socket.once('listening', function () {
    socket.send(
      magicPacket,
      undefined,
      undefined,
      port,
      address,
      function (err) {
        if (err) {
          throw err;
        }

        console.log('Magic packet sent');
        socket.close();
      },
    );
  });
}

function shutdownServer() {
  console.log('Sending shutdown command');
  let command = `echo ${Config.SSH_PASSWORD} | sudo -S shutdown now`;
  console.log('Shutdown command sent');

  return SSH.execute(SSH_CONFIG, command).then(
    (result) => result,
    (error) => error,
  );
}

export default function MainController() {
  const [mediaServerStatus, setMediaServerStatus] = useState('off');

  function refreshMediaServerStatus() {
    pingMediaServer().then((result) => {
      console.log(`Refreshed: ${result.length === 0 ? 'on' : 'off'}`);
      // result === [] if there are no errors, otherwise [<the error>]
      if (result.length === 0) {
        setMediaServerStatus('on');
      } else {
        setMediaServerStatus('off');
      }
    });
  }

  refreshMediaServerStatus();

  useEffect(() => {
    var mediaServerPing = setInterval(() => {
      refreshMediaServerStatus();
    }, 30000);
    return () => {
      clearInterval(mediaServerPing);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.statusText}>
          The media server is currently {mediaServerStatus}
        </Text>
      </View>

      <View style={styles.controlPanel}>
        <RefreshButton
          padding={30}
          borderRadius={10}
          borderWidth={1}
          marginRight={5}
          onPress={refreshMediaServerStatus}
        />
        {mediaServerStatus === 'off' && (
          <StartButton
            padding={30}
            borderRadius={10}
            borderWidth={1}
            marginLeft={5}
            onPress={sendMagicPacket}
          />
        )}

        {mediaServerStatus === 'on' && (
          <ShutdownButton
            padding={30}
            borderRadius={10}
            borderWidth={1}
            marginLeft={5}
            onPress={shutdownServer}
          />
        )}
      </View>

      <View style={styles.downloadOptions}>
        {mediaServerStatus === 'on' && <DownloadOptions />}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#000',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  status: {
    flex: 2,
    backgroundColor: 'black',
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  statusText: {
    color: 'white',
    textAlign: 'left',
    alignSelf: 'stretch',
    fontFamily: 'Roboto',
    fontSize: 15,
    paddingBottom: 20,
  },
  stopButton: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: 'red',
    color: 'white',
    backgroundColor: 'transparent',
  },
  controlPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  downloadOptions: {
    flex: 3,
    // backgroundColor: 'orange',
    borderRadius: 10,
    paddingTop: 20,
  },
});
