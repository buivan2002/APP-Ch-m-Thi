import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import io from 'socket.io-client';

export default function connected() {
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:3001');  // Địa chỉ server Node.js

  useEffect(() => {
    // Lắng nghe sự kiện 'message' từ server
    socket.on('message', (data) => {
      console.log('Nhận được tin nhắn từ server:', data);
      setMessage(data);
    });

    // Cleanup khi component bị unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Gửi tin nhắn đến server
  const sendMessage = () => {
    socket.emit('message', 'Hello from React Native');
  };

  return (
    <View style={styles.container}>
      <Text>Tin nhắn từ server: {message}</Text>
      <Button title="Gửi tin nhắn" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
