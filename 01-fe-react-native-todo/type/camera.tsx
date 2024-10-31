import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import socket from '../ulti/socketio'; // Đảm bảo bạn có file socketio.js
import { NavigationProp, RouteProp, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const navigation: NavigationProp<any> = useNavigation();

  const [hasPermission, setHasPermission] = useState(true);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [receivedImage, setReceivedImage] = useState(null); // Lưu URI của ảnh nhận được

  useEffect(() => {
    const initializeSocket = async () => {
      await socket.initializeSocket();

      // Lắng nghe sự kiện receive_image từ server
     
    };
   
    initializeSocket();
    socket.on('receive_image', (data) => {
      // Navigate to ImageScreen and pass the base64 image data as a param
      navigation.navigate('Image', { imageData: data });
    }); 
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const captureAndSend = async () => {
    if (!isCameraReady) {
      console.log("Camera is not ready yet.");
      return;
    }
    try {
      const photoData = await cameraRef.current.takePictureAsync({ base64: false });
      console.log('Original image URI:', photoData.uri);

      // Nén ảnh
      const resizedImage = await ImageManipulator.manipulateAsync(
        photoData.uri,
        [{ resize: { width: 920, height: 1313 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      const compressedBase64Data = await fetch(resizedImage.uri)
        .then(res => res.blob())
        .then(blob => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(blob);
        }));

      if (socket) {
        socket.emit('request_camera', compressedBase64Data);
      }
    } catch (error) {
      console.error('Error capturing or resizing photo:', error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} onCameraReady={onCameraReady} />
      <Button title="Take Picture" onPress={captureAndSend} />
      {receivedImage && (
        <Image source={{ uri: receivedImage }} style={styles.image} />
      )}
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
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default CameraScreen;
