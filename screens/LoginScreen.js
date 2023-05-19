// Import necessary dependencies
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { auth, database, getDate } from '../firebase';

// Define LoginScreen component
const LoginScreen = () => {
  // Variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get navigational ability
  const navigation = useNavigation();

  // useEffect hook to check if user is authentic
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // If the are authenticated redirect user to home screen. 
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  // Function that handles user sign up
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        //Remove console log at end
        console.log('Registered with:', user.email);

        // Store user data in the database and set water & calories to 0 as they are new users. 
        database.ref('users/' + user.uid).set({
          [getDate()]: {
            water: 0,
            calories: 0,
          },
        });
      })
      .catch(error => handleError(error));
  };

  // Function to handle different login/register edge cases
  const handleError = error => {
    switch (error.code) {
      case "auth/invalid-email":
        alert("Invalid email address.");
        break;
      case "auth/email-already-in-use":
        alert("Email address already in use.");
        break;
      case "auth/missing-password":
        alert("Enter a password.");
        break;
      case "auth/wrong-password":
        alert("Incorrect password.");
        break;
      case "auth/weak-password":
        alert("Password must be at least 6 characters.");
        break;
      case "auth/user-not-found":
        alert("Email address not recognized.");
        break;
      default:
        alert(error.message);
        break;
    }
  };

  // Function to handle user login
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        //Remove console log at end
        console.log('Logged in with:', user.email);
      })
      .catch(error => handleError(error));
  };

  // Return rendered login screen
return (
  <View style={styles.container}>
    {/* Logo container */}
    <View style={styles.logoContainer}>
      {/* Logo image */}
      <Image source={require('../Logo.png')} style={styles.logo} />
    </View>
    
    {/* Keyboard avoiding view ensuring input fields are not hidden by the keyboard */}
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior="contain"
    >
      <View style={styles.inputContainer}>
        {/* Email input field */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        {/* Password input field */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          {/* Login button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* Register button */}
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </View>
);
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4FAFA',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    top: -60,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -80,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '80%',
    paddingBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F18A8A',
    borderColor: 'black', 
    borderWidth: 2,
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2,
    width: 200, 
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
  },
})