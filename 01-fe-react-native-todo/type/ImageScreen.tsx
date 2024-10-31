import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

const ImageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageData } = route.params; // Lấy dữ liệu ảnh từ params

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageData }} // Hiển thị ảnh từ imageData
        style={styles.image}
        resizeMode="contain"
      />
      <Button title="Back to Camera" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '90%', height: '80%' },
});

export default ImageScreen;
