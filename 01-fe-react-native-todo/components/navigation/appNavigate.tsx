import React, { useEffect } from 'react';
import { NavigationProp, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../review/HomeScreen';
import AboutScreen from '../review/about';
import Setting from '../review/setting';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AnswerScreen from '../review/detail';
import AppHeader from './appHeader';
import CameraScreen from '../../type/camera';
import Camera from '../review/camera2';
import connected from '../../type/connected';

// HomeLayout nhận navigation và route từ Tab.Screen mà không cần khai báo kiểu
const HomeLayout = ({ navigation, route }: any) => { // Thay { navigation, route }: HomeLayoutProps thành any
  const Stack = createNativeStackNavigator<RootStackParamList>();

  // Ẩn header khi vào trang chi tiết review
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'home'  ) {

      navigation.setOptions({ headerShown: true });
    } else {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="review-detail"
        component={AnswerScreen}
        options={{ header: () => <AppHeader /> }}


      />
        <Stack.Screen name="camera" 
        component={CameraScreen} 
        options={{ headerShown: true }} /> 


    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeLayout} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          title: 'Trang Chủ',
        }}
      />
      <Tab.Screen
        name="File"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="file" size={size} color={color} />
          ),
          title: 'Giới Thiệu',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
          title: 'Cài Đặt',
        }}
      /> 
   
    </Tab.Navigator>
  );
};

export default AppNavigation;
