import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AppHeader = () => {
    const navigation: NavigationProp<any> = useNavigation();

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <Ionicons name="arrow-back" size={24} color="black" 
        onPress={() => navigation.goBack()}
      />
      {/* Tiêu đề */}
      <Text style={styles.headerText}>Điền đáp án</Text>
      {/* Nút mở Camera */}
      <Button 
        title="Open Camera" 
        onPress={() => navigation.navigate("camera")} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        justifyContent: 'space-between', // Căn đều không gian giữa các phần tử
        backgroundColor: '#4A90E2', // Màu nền xanh
        paddingVertical: 50, // Khoảng cách trên dưới
        paddingHorizontal: 15, // Khoảng cách trái phải
        borderRadius: 10, // Bo góc cho view
        elevation: 4, // Tạo hiệu ứng đổ bóng (Android)
        shadowColor: '#000', // Tạo hiệu ứng đổ bóng (iOS)
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng (iOS)
        shadowOpacity: 0.3, // Độ mờ của bóng (iOS)
        shadowRadius: 4, // Bán kính của bóng (iOS)
      },
      icon: {
        padding: 10, // Tạo khoảng cách xung quanh biểu tượng
      },
      headerText: {
        fontSize: 20, // Kích thước chữ tiêu đề
        fontWeight: 'bold', // Đậm chữ
        color: 'white', // Màu chữ trắng
      },
      button: {
        backgroundColor: '#ffffff', // Nền nút màu trắng
        borderRadius: 5, // Bo tròn nút
        paddingHorizontal: 15, // Khoảng cách ngang trong nút
        paddingVertical: 10, // Khoảng cách dọc trong nút
        fontSize: 16, // Kích thước chữ của nút
      },
      backButtonText: {
        color: '#4A90E2', // Màu chữ của nút "Back"
        fontSize: 16,
      }
});

export default AppHeader;
