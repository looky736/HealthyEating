import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AccountScreen from './screens/AccountScreen';
import InfoScreen from './screens/InformationScreen';
import CalScreen from './screens/CalorieScreen';
import WaterScreen from './screens/WaterScreen';
import TipsScreen from './screens/TipsScreen';
import BmiScreen from './screens/BmiScreen';
import MealScreen from './screens/MealScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} /> 
        <Stack.Screen options={{ headerShown: true }} name="Account" component={AccountScreen} /> 
        <Stack.Screen options={{ headerShown: true }} name="Info" component={InfoScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Calorie" component={CalScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Water" component={WaterScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Tips" component={TipsScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Meal" component={MealScreen} />
        <Stack.Screen options={{ headerShown: true }} name="BMI" component={BmiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
