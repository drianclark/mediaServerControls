/* eslint-disable no-bitwise */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import dgram from 'react-native-udp';
import SSH from 'react-native-ssh';
import Config from 'react-native-config';

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
  let command = `echo ${Config.SSH_PASSWORD} | sudo -S shutdown now`;

  return SSH.execute(SSH_CONFIG, command).then(
    (result) => result,
    (error) => error,
  );
}

export default function App() {
  const [mediaServerStatus, setMediaServerStatus] = useState('off');

  pingMediaServer().then((result) => {
    // result === [] if there are no errors, otherwise [<the error>]
    if (result.length === 0) {
      setMediaServerStatus('on');
    }
  });

  return (
    <View style={styles.container}>
      {mediaServerStatus === 'off' && (
          <Text>The media server is currently off</Text>
        ) && (
          <Button
            syle={styles.startButton}
            title="Start Server"
            onPress={sendMagicPacket}
          />
        )}

      {mediaServerStatus === 'on' && (
        <Button title="Shutdown Server" onPress={shutdownServer} />
      )}

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
  startButton: {
    marginTop: 10,
  },
});
