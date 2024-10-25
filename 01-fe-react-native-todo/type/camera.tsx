import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import socket from '../ulti/socketio';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const cameraRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      // Khởi tạo socket
      socket.initializeSocket();

      // Xin quyền truy cập camera
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      // Thiết lập interval chụp ảnh nếu có quyền
      if (status === 'granted') {
        setIsCapturing(true);
        const interval = setInterval(async () => {
          setCounter(prevCounter => prevCounter + 1);

          if (cameraRef.current) {
            try {
              const photoData =  cameraRef.current.takePictureAsync({ base64: true });
              socket.emit('request_camera', photoData);
            } catch (error) {
              console.error('Lỗi chụp ảnh:', error);
            }
          }
        }, 10); // 10 tấm/giây

        // Dọn dẹp interval khi component unmount hoặc không còn cần thiết
        return () => {
          clearInterval(interval);
          socket.socket && socket.socket.disconnect(); // Ngắt kết nối khi component unmount
        };
      }
    };

    initialize();
  }, []); // Chạy chỉ một lần khi component mount

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default CameraScreen;
