import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const InfoScreen = () => {
  const [calories, setCalories] = useState(0);
  const maxCalories = 2300;

  useEffect(() => {
    if (calories < maxCalories) {
      const intervalId = setInterval(() => {
        setCalories(c => c + 10);
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [calories]);

  const progress = calories / maxCalories;
  const deg = 360 * progress;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { transform: [{ rotateZ: `${deg}deg` }] }]} />
        <Text style={styles.progressText}>{calories} / {maxCalories} Calories</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Calories</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#0782F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 3,
    borderColor: '#00bcd4',
    borderLeftColor: '#0782F9',
    borderBottomColor: '#0782F9',
    transform: [{ rotateZ: '0deg' }],
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
