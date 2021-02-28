/* eslint-disable no-bitwise */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import dgram from 'react-native-udp';
import SSH from 'react-native-ssh';
import Config from 'react-native-config';

function pingMediaServer() {
  let command = 'true';
  let config = {
    user: Config.SSH_USER,
    host: Config.SSH_HOST,
    password: Config.SSH_PASSWORD,
  };

  return SSH.execute(config, command).then(
    (result) => result,
    (error) => error,
  );
}

function randomPort() {
  return (Math.random() * 60536) | (0 + 5000); // 60536-65536
}

function read_mac_address() {
  // var reader = new FileReader();
  // let mac = reader.readAsText('/home/adrian/config/media_server_mac', 'UTF-8');
  return 'f0:de:f1:bc:54:14';
}

function constructMagicPacket() {
  let mac = read_mac_address();

  let split_mac = mac.split(':');
  let decimal_mac = [];

  split_mac.forEach((hex) => {
    decimal_mac.push(parseInt(hex, 16).toString());
  });

  let ff_bit = new Array(6).fill('255');
  let mac_bit = new Array(16).fill(decimal_mac).flat();
  let magicPacket = ff_bit.concat(mac_bit);

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

export default function App() {
  const [mediaServerStatus, setMediaServerStatus] = useState('off');

  pingMediaServer().then((result) => {
    if (result.length === 0) {
      setMediaServerStatus('on');
    }
  });

  return (
    <View style={styles.container}>
      {mediaServerStatus === 'off' && (
          <Text>The media server is currently off</Text>
        ) && <Button title="Start Server" onPress={sendMagicPacket} />}

      <Button title="Test SSH" onPress={pingMediaServer} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});