import React, { useState } from 'react';
import { View, Text  } from 'react-native';
import CameraScreen from '../../type/camera';
import SocketComponent from '../../type/connected';
const MainComponent = () => {
  const [base64Data, setBase64Data] = useState(null);

  const handleCapture = (data) => {
    setBase64Data(data); // Cập nhật dữ liệu ảnh khi chụp
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraScreen onCapture={handleCapture} /> 
      <SocketComponent base64Data={base64Data} />
    </View>
  );
};

export default MainComponent;
