// Import necessary dependencies and modules
import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import { database, auth, getDate } from '../firebase';

// Define an array of tips
const tips = [
  "Limiting consumption of processed and packaged foods can help reduce intake of unhealthy additives, preservatives, and excess sodium",
  "Consuming lean protein sources, such as chicken, fish, and legumes, can help build and repair tissues in the body.",
  "Healthy fats, such as those found in nuts, seeds, and avocados, can help reduce inflammation and improve heart health.",
  "Consuming too much added sugar can increase the risk of obesity, type 2 diabetes, and heart disease.",
  "Drinking plenty of water can help keep your body hydrated and maintain proper organ function.",
  "Eating a balanced breakfast can help boost metabolism, improve concentration, and control appetite throughout the day.",
  "Eating a diet rich in fruits and vegetables can help reduce the risk of chronic diseases such as heart disease and cancer.",
  "Plant-based diets can be beneficial for health, and can help reduce the risk of chronic diseases.",
  "Eating whole grains instead of refined grains can help reduce the risk of heart disease, type 2 diabetes, and obesity.",
  "Eating slowly and mindfully can help improve digestion, increase satiety, and prevent overeating.",
];

// Define the AccountScreen component
const AccountScreen = () => {
  const navigation = useNavigation(); // Obtaining navigation object
  const [water, setWaterConsumed] = useState(0); // Initialise water consumed state to 0
  const [calories, setCalories] = useState(0); // Initialise calories state to 0
  const [tip, setTip] = useState("Healthy fats, such as those found in nuts, seeds, and avocados, can help reduce inflammation and improve heart health."); // Initialise tip state with a default tip
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0)); // Initialise opacity animation value to 0

  const handleSignOut = () => {
    // Handle the sign out action
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login"); // Redirect user to the login screen
      })
      .catch(error => alert(error.message)); // Display an alert if there's an error
  };

  const handleDelete = () => {
    // Handle the user account deletion action
    database.ref('users/' + auth.currentUser.uid).remove(); // Remove the user's data from the database
    auth.currentUser.delete().then(() => {
      navigation.replace("Login"); // Redirect to the login screen
    }).catch((error) => {
      alert("Sign out and sign in again to delete your account."); // Display an alert if there's an error. Maybe get rid of this. 
    });
  };

  // Retrieve daily stats from the database
  database.ref('users/' + auth.currentUser.uid + '/' + getDate()).once('value', (snapshot) => {
    if (snapshot.val()) {
      setWaterConsumed(snapshot.val().water ?? 0); // Set the water consumed state with the retrieved value, or 0 if not available
      setCalories(snapshot.val().calories ?? 0); // Set the calories state with the retrieved value, or 0 if not available
    }
  });

 // Define the fadeIn function for the opacity animation
const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
};

// Define the fadeOut function for the opacity animation
const fadeOut = () => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
  }).start();
};

// Set up the interval for displaying random tips
useEffect(() => {
  const intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    fadeOut(); // Fade out the current tip
    setTimeout(() => {
      setTip(tips[randomIndex]); // Set a new random tip
      fadeIn(); // Fade in the new tip
    }, 1000);
  }, 4500);
  return () => clearInterval(intervalId); // Clear the interval when the component unmounts
}, []);

// Render the Account screen for user .
  return (
    <View style={styles.container}>
      <Image source={require('../Logo.png')} style={styles.logo} />
      <View style={styles.emailContainer}>
        <Text style={styles.heading}>My Account</Text>
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
      </View>
      <Text style={styles.label}>Daily Stats:</Text>
      <Text style={styles.statsText1}>{water}ml consumed today</Text>
      <Text style={styles.statsText2}>{calories} calories consumed today</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <Text style={[styles.tipHeading, {textAlign: 'left'}]}><Text style={{fontWeight: 'bold'}}>Random tip:</Text></Text>
      <Text style={styles.tip}>{tip}</Text>
      <TouchableOpacity
        onPress={handleDelete}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4FAFA',
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emailContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  emailText: {
    fontSize: 18,
  },
  statsText1:{
    fontSize: 14,
  },
  statsText2:{
    fontSize: 14,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  tipHeading: {
    fontSize: 15,
  },
  tip: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  heading:{
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F18A8A',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  deleteButton: {
    backgroundColor: '#B90E0A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  deleteText: {
    color: 'white',
    fontWeight: '700',
  },  
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AccountScreen;
