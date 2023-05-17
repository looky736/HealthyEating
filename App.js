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
import MealScreen1 from './screens/MealScreen1';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} /> 
        <Stack.Screen options={{ headerShown: true }} name="Account" component={AccountScreen} /> 
        <Stack.Screen options={{ headerShown: true }} name="About Healthy Habits" component={InfoScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Calorie Tracker" component={CalScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Water Tracker" component={WaterScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Tips & Tricks" component={TipsScreen} />
        <Stack.Screen options={{ headerShown: true }} name="View Meals" component={MealScreen} />
        <Stack.Screen options={{ headerShown: true }} name="BMI Calculator" component={BmiScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Meal Viewer" component={MealScreen1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
