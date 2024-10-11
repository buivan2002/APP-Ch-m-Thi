import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import io from 'socket.io-client';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(true);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraResponse, setCameraResponse] = useState(null);
  
  // Kết nối tới Node.js server qua Socket.IO
  const socket = io('http://localhost:3001');
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    
    // Lắng nghe sự kiện 'camera_response' từ Node.js server
    socket.on('camera_response', (data) => {
      console.log('Nhận dữ liệu từ server:', data);
      setCameraResponse(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const openCamera = () => {
    setCameraOpen(true);
    socket.on('connection', () => {
      console.log('Kết nối thành công đến server Node.js');
  });
    // Gửi yêu cầu tới Node.js server khi mở camera
    socket.emit('request_camera');
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraOpen ? (
        <CameraView style={styles.camera} />
      ) : (
        <Button title="Open Camera" onPress={openCamera} />
      )}
      {cameraResponse && (
        <Text>Response from Python: {cameraResponse.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});
