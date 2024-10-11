import { Text, View } from "react-native"
import HomeScreen from "./components/review/HomeScreen";
import DetailScreen from "./components/review/detail";
import AboutScreen from "./components/review/about";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { OPENSANS_REGULAR } from "./ulti/const";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from "./components/navigation/appNavigate";

SplashScreen.preventAutoHideAsync();

const App = () => {
    const [loaded, error] = useFonts({
        [OPENSANS_REGULAR]: require('./assets/fonts/OpenSans-Regular.ttf'),
    });
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    if (!loaded && !error) {
        return null;
    }

    return (
      <>
      <NavigationContainer>
          <AppNavigation />
      </NavigationContainer>
  </>
)
}
export default App;