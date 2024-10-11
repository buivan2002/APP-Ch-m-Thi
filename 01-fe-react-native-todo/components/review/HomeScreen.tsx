import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet ,ImageSourcePropType } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface IReview {
  id: number;
  title: string;
  quantity: number;
  image: ImageSourcePropType; // Add image URL to the review interface
}

const HomeScreen = (props: any) => {
  const navigation: NavigationProp<any> = useNavigation();
  
  // Update state to include an image URL
  const [reviews, setReviews] = useState<IReview[]>([
    { id: 1, title: "React Native", quantity: 50, image: require('../../assets/img/50cau_PhieuA4-50-BGD.jpg') },
    { id: 2, title: "hoidanit", quantity: 40, image: require('../../assets/img/DuThao_PHIEU TLTN_2025-BoGiaoduc-hinhanh-0.jpg') },
    { id: 3, title: "hoidanit", quantity: 120, image: require('../../assets/img/ThiTHPTQG120-BGD.jpg') }
  ]);

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Review list:</Text>
      <View>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("review-detail", item)}
            >
              <View style={styles.reviewItem}>
                <Text style={styles.reviewText}>{item.title}</Text>
                <Image
                  style={styles.tinyLogo}
                  source={item.image} // Dynamically load image from state
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  reviewText: {
    flex: 1,
    fontSize: 18,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
