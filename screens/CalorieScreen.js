import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { database, auth, getDate } from '../firebase';

// Defining main CalorieCounter fucntion
const CalorieCounter = () => {
  // Declare state variables using the useState hook
  const [dailyGoal, setDailyGoal] = useState('');
  const [calories, setCalories] = useState(0);
  const [goal, setGoal] = useState('');
  const [inputCalories, setInputCalories] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);

  // Function that handle setting the daily calorie goal
  const handleSetGoal = () => {
    const newGoal = parseInt(goal);
    // Is the goal a valid number
    if (!isNaN(goal)) {
      setDailyGoal(newGoal.toString());
      // Update firebase database with calorie goal thats been set.
      database.ref('users/' + auth.currentUser.uid + '/goals').update({
        calorieGoal: newGoal,
      });
    }
  };

  // Function that handles user adding caloires
  const handleAddCalories = () => {
    const newCalories = parseInt(inputCalories);
    // Check if the calories inputted is valid
    if (!isNaN(newCalories)) {
      const updatedCalories = calories + newCalories;
      setCalories(updatedCalories);
      // Update database to relfect new calories added
      database.ref('users/' + auth.currentUser.uid + '/' + getDate()).update({
        calories: updatedCalories,
      });
      setInputCalories('');
    }
  };

  // Function that handles user wanting to change calorie goal 
  const handleChangeGoal = (value) => {
    setGoal(value);
    const newGoal = parseInt(value);
    // Is the new goal a valid number between 1000 and 9999. If it is use valid pink button if not then use greyed out invalid value button.
    if (!isNaN(newGoal) && newGoal >= 1000 && newGoal <= 9999) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  // Function that resets the calorie goal to 0 as user wants to change their goal.
  const changeGoal = () => {
    database.ref('users/' + auth.currentUser.uid + '/goals').update({
      calorieGoal: 0,
    });
    setDailyGoal('');
  };

  // Function that resets the users calories consumed back to 0. 
  const resetCalorie = () => {
    setCalories(0);
    database.ref('users/' + auth.currentUser.uid + '/' + getDate()).update({
      calories: 0,
    });
  };

  // Function that handles new user input
  const handleChangeInputCalories = (value) => {
    setInputCalories(value);
    const newCalories = parseInt(value);
    // Check if the new input calories is a valid number between 0 and 9999
    if (!isNaN(newCalories) && newCalories >= 0 && newCalories <= 9999) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  // Then fetch the users calories goal and calories consumed
  database.ref('users/' + auth.currentUser.uid).once('value', (snapshot) => {
    if (snapshot.val()) {
      // if snapshot value exists set daily goal and calories
      if (snapshot.val().goals) {
        setDailyGoal(snapshot.val().goals.calorieGoal.toString());
      }
      if (snapshot.val()[getDate()]) {
        setCalories(snapshot.val()[getDate()].calories);
      }
    }
  });

  if (!parseInt(dailyGoal)) {
    // if daily goal isnt a valid integer or 0 then execute the following.
    return (
      <View style={styles.container}>
        <Text style={styles.dailyLimitText}>Enter your daily calorie goal:</Text>
        <Text style={styles.help}>Goal should be between 1000 and 9999 calories</Text>
        <TextInput
          style={styles.input}
          placeholder="0" //indictor for numbers to be typed.
          keyboardType="numeric" // only want to accept numbers
          value={goal}
          onChangeText={handleChangeGoal}
          // goal should be between 1000-9999 so 4 digits.
          minLength={4}
          maxLength={4} 
        />
        <TouchableOpacity style={buttonEnabled ? styles.button : styles.disabledButton} disabled={buttonEnabled ? false : true} onPress={handleSetGoal}>
          <Text style={styles.buttonText}>{buttonEnabled ? 'Set Goal' : 'Invalid Value'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progress = Math.min((calories / parseInt(dailyGoal)) * 100, 100);
  /* Calculates the ratio of consumed calories to the daily goal by dividing calories by parseInt(dailyGoal).
  Result is multiplied by 100 to be able to convert it to a percentage.
  The second argument 100 serves as the upper limit. I want to restrict the progress value to 100. */
 
  return (
    <View style={styles.container}>
      {/* Display the user daily calorie goal */}
      <View style={styles.dailyLimitContainer}>
            <Text style={styles.dailyLimitText}>Your daily calorie goal is:</Text>
      </View>

      <View >
        <Text style={styles.calories}>{dailyGoal}</Text>
      </View>
        {/* Display the progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
        {/* Display the jetski image just left of progress bar */}
        <Image
          source={require('../Jetski.gif')}
          resizeMode="contain"
          style={[styles.jetski, { left: `${progress - 4}%` }]}
        />
      {/* Display the finish line image */}
        <Image
          source={require('../Finish.png')}
          resizeMode="contain"
          style={[styles.finish, { right: -19, height:50, width: 30, top:-45, }]}
        />
      </View> 
      {/* Display the amount of calories consumed by user so far*/}
      <View style={styles.dailyLimitContainer}>
            <Text style={styles.help}>You have consumed {calories ?? '0'} calories so far.</Text>
      </View>
      {/* User inputting calories*/}
      <TextInput 
        style={styles.input}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={inputCalories}
        onChangeText={handleChangeInputCalories}
      />
      {/* Use disabled or enabled button*/}
      <TouchableOpacity style={buttonEnabled ? styles.button : styles.disabledButton} disabled={buttonEnabled ? false : true} onPress={handleAddCalories}>
        <Text style={styles.buttonText}>{buttonEnabled ? 'Add Calories' : 'Invalid Value'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetCalorie}>
        <Text style={styles.buttonText}>Reset Calories</Text>
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#F18A8A',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 169,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 169,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
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
    backgroundColor: '#4FC3F7',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  finish: {
    position: 'absolute',
    top: -23,
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    borderRadius: 100,
    transform: [{ scaleX: -1 }],
  },
  jetski: {
    position: 'absolute',
    top: -23,
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    borderRadius: 100,
    left: -180,
  },
});

export default CalorieCounter;
