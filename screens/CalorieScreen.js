import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const CalorieCounter = () => {
  const [calories, setCalories] = useState(0);
  const [inputCalories, setInputCalories] = useState('');
  const [dailyLimit, setDailyLimit] = useState('2300');
  const [inputDailyLimit, setInputDailyLimit] = useState('');
  const [hasSetGoal, setHasSetGoal] = useState(false);

  useEffect(() => {
    const newLimit = parseInt(inputDailyLimit);
    if (!isNaN(newLimit) && inputDailyLimit.length === 4) {
      setDailyLimit(newLimit.toString());
      setHasSetGoal(true);
    }
  }, [inputDailyLimit]);

  const handleAddCalories = () => {
    const newCalories = parseInt(inputCalories);
    if (!isNaN(newCalories)) {
      const updatedCalories = calories + newCalories;
      if (updatedCalories <= parseInt(dailyLimit)) {
        setCalories(updatedCalories);
      } else {
        setCalories(parseInt(dailyLimit));
      }
      setInputCalories('');
    }
  };

  const remainingCalories = parseInt(dailyLimit) - calories;
  const progress = Math.min((calories / parseInt(dailyLimit)) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.dailyLimitContainer}>
        {hasSetGoal ? (
          <View>
            <Text style={styles.dailyLimitText}>Your daily calorie goal is:</Text>
            <Text style={styles.dailyLimitText}>{dailyLimit}</Text>
            <Text style={styles.dailyLimitText}>You have {remainingCalories} calories remaining</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.dailyLimitText}>Enter your daily calorie goal:</Text>
            <TextInput
              style={styles.dailyLimitInput}
              placeholder="Enter daily calorie goal"
              keyboardType="numeric"
              value={inputDailyLimit}
              onChangeText={setInputDailyLimit}
              maxLength={4} // add maxLength prop to limit input to 4 characters
            />
          </View>
        )}
      </View>
      <View style={styles.circle}>
        <Text style={styles.calories}>{remainingCalories}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
        <Image
          source={require('../running-man.gif')}
          resizeMode="contain"
          style={[styles.character, { left: `${progress}%` }]}
        />
        <Image
          source={require('../Finish.png')}
          resizeMode="contain"
          style={[styles.character, { right: -20 }]}
        />
      </View> 
      <TextInput
        style={styles.input}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={inputCalories}
        onChangeText={setInputCalories}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCalories}>
        <Text style={styles.buttonText}>Add Calories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4FAFA',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calories: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#0782F9',
  },
  input: {
    width: '60%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#F78766',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBar: {
    height: 20,
    width: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 20,
    position: 'relative',
  },
  progress: {
    height: 20,
    backgroundColor: '#0782F9',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  character: {
    position: 'absolute',
    top: -10,
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    borderRadius: 100,
    transform: [{ scaleX: -1 }],
  },
});

export default CalorieCounter;
