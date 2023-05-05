import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {database, auth, getDate} from '../firebase';

const CalorieCounter = () => {
  const [dailyGoal, setDailyGoal] = useState('');
  const [calories, setCalories] = useState(0);
  const [goal, setGoal] = useState('');
  const [inputCalories, setInputCalories] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleSetGoal = () => {
    const newGoal = parseInt(goal)
    if (!isNaN(goal)) {
      setDailyGoal(newGoal.toString());
      database.ref('users/' + auth.currentUser.uid + '/goals').update({
        calorieGoal: newGoal,
      });
    }
  };

  const handleAddCalories = () => {
    const newCalories = parseInt(inputCalories);
    if (!isNaN(newCalories)) {
      const updatedCalories = calories + newCalories;
      setCalories(updatedCalories);
      database.ref('users/' + auth.currentUser.uid + '/' + getDate()).update({
        calories: updatedCalories,
      });
      setInputCalories('');
    }
  };

  const handleChangeGoal = (value) => {
    setGoal(value)
    const newGoal = parseInt(value)
    if (!isNaN(newGoal) && newGoal >= 1000 && newGoal <= 9999) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  const changeGoal = () => {
    database.ref('users/' + auth.currentUser.uid + '/goals').update({
      calorieGoal: 0,
    });
    setDailyGoal('');
  };

  const handleChangeInputCalories = (value) => {
    setInputCalories(value)
    const newCalories = parseInt(value)
    if (!isNaN(newCalories) && newCalories >= 0 && newCalories <= 9999) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };


  database.ref('users/' + auth.currentUser.uid).once('value', (snapshot) => {
    if (snapshot.val()) {
      if (snapshot.val().goals) {
        setDailyGoal(snapshot.val().goals.calorieGoal.toString());
      }
      if (snapshot.val()[getDate()]) {
        setCalories(snapshot.val()[getDate()].calories);
      }
    }
  });

  if (!parseInt(dailyGoal)) {
    return (
      <View style={styles.container}>
        <Text style={styles.dailyLimitText}>Enter your daily calorie goal:</Text>
        <Text style={styles.help}>Goal should be between 1000 and 9999 calories</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={goal}
          onChangeText={handleChangeGoal}
          minLength={4}
          maxLength={4} // add maxLength prop to limit input to 4 characters
        />
        <TouchableOpacity style={buttonEnabled ? styles.button : styles.disabledButton} disabled={buttonEnabled ? false : true} onPress={handleSetGoal}>
          <Text style={styles.buttonText}>{buttonEnabled ? 'Set Goal' : 'Invalid Value'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progress = Math.min((calories / parseInt(dailyGoal)) * 100, 100);

  return (
    <View style={styles.container}>
      
      <View style={styles.dailyLimitContainer}>
            <Text style={styles.dailyLimitText}>Your daily calorie goal is:</Text>
      </View>

      <View >
        <Text style={styles.calories}>{dailyGoal}</Text>
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
          style={[styles.character, { right: -19, height:50, width: 30, top:-35, }]}
        />
      </View> 

      <View style={styles.dailyLimitContainer}>
            <Text style={styles.help}>You have consumed {calories} calories so far</Text>
      </View>

      <TextInput 
        style={styles.input}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={inputCalories}
        onChangeText={handleChangeInputCalories}
      />
      <TouchableOpacity style={buttonEnabled ? styles.button : styles.disabledButton} disabled={buttonEnabled ? false : true} onPress={handleAddCalories}>
        <Text style={styles.buttonText}>Add Calories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={changeGoal}>
        <Text style={styles.buttonText}>Reset Goal</Text>
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
  disabledButton: {
    backgroundColor: 'grey',
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
  dailyLimitText: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  help: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'normal',
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
