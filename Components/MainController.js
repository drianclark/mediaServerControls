/* eslint-disable no-bitwise */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import dgram from 'react-native-udp';
import SSH from 'react-native-ssh';
import Config from 'react-native-config';
import PowerControls from './PowerControls';
import DownloadControls from './DownloadControls';

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
    console.log('refresh');
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
      <View style={styles.spacer} />
      <View style={styles.status}>
        <Text style={styles.statusText}>
          The media server is currently {mediaServerStatus}
        </Text>
      </View>

      <View style={styles.powerControls}>
        <PowerControls
          status={mediaServerStatus}
          shutdownServer={shutdownServer}
          startServer={sendMagicPacket}
          refreshStatus={refreshMediaServerStatus}
        />
      </View>

      <View style={styles.downloadControls}>
        {mediaServerStatus === 'on' && <DownloadControls />}
      </View>
      <View style={styles.spacer} />

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
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  statusText: {
    color: 'white',
    textAlign: 'left',
    alignSelf: 'stretch',
    fontFamily: 'Roboto',
    fontSize: 19,
    paddingBottom: 30,
  },
  stopButton: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    borderColor: 'red',
    color: 'white',
    backgroundColor: 'transparent',
  },
  powerControls: {
    flex: 2,
  },
  downloadControls: {
    flex: 4,
  },
  spacer: {
    flex: 3,
  },
});
