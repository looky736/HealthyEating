import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native'
import { database, auth, getDate } from '../firebase';

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

const AccountScreen = () => {
  const navigation = useNavigation()
  const [water, setWaterConsumed] = useState(0);
  const [calories, setCalories] = useState(0);
  const [tip, setTip] = useState("Healthy fats, such as those found in nuts, seeds, and avocados, can help reduce inflammation and improve heart health.");
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0)); // initialize opacity to 0

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  database.ref('users/' + auth.currentUser.uid + '/' + getDate()).once('value', (snapshot) => {
    if (snapshot.val()) {
      setWaterConsumed(snapshot.val().water);
      setCalories(snapshot.val().calories);
    }
  });

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      fadeOut(); // fade out the current tip
      setTimeout(() => {
        setTip(tips[randomIndex]);
        fadeIn(); // fade in the new tip
      }, 1000);
    }, 4500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../Logo.png')} style={styles.logo} />
      <Text style={[styles.tipHeading, {textAlign: 'left'}]}><Text style={{fontWeight: 'bold'}}>Random tip:</Text></Text>
      <Text style={styles.tip}>{tip}</Text>
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
    position: 'absolute',
    width: 250,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: 0,
  },
  emailContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
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
    top: 0,
    fontSize: 15,
  },
  tip: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    top: 0,
  },
  heading:{
    fontSize: 40,
    fontWeight: 'bold',
    bottom: -10,
  },
  button: {
    backgroundColor: '#F18A8A',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AccountScreen;
