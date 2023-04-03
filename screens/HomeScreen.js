import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,TouchableHighlight, TouchableWithoutFeedback,  View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Account')}>
        <Image source={require('../UserAvatar.png')} style={styles.UserImage}/>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calorie')}>
        <Text style={styles.buttonText}>Calorie Tracker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BMI')}>
        <Text style={styles.buttonText}>BMI Calculator </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Water')}>
        <Text style={styles.buttonText}>Water Tracker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meal')}>
        <Text style={styles.buttonText}>Meal Viewer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tips')}>
        <Text style={styles.buttonText}>Tips and Tricks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate('Info')}>
        <Text style={styles.infoButtonText}>i</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#246EE9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#edb14f',
    padding: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoButton: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  UserImage: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
    top: 27,
    right: -8,
  },
});
