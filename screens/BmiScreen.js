import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const BmiScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [bmi, setBmi] = useState(0);

  const calculateBMI = () => {
    if (!isNaN(parseInt(weight)) && !isNaN(parseInt(height))) {
      const mheight = parseInt(height)/100;
      const bmi = parseInt(weight) / (mheight * mheight);
      setBmi(bmi.toFixed(1));
      console.log(bmi)
    }
  };

  const parseBMI = (bmi) => {
    if (bmi < 18.5) {
      return 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'a normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'overweight'
    } else {
      return 'obese'
    }
  }

  if (bmi) {
    return (
      <View style={styles.container}>
        <View style={styles.dailyLimitContainer}>
            <Text style={styles.dailyLimitText}>Your BMI is:</Text>
        </View>

        <View >
          <Text style={styles.bmi}>{bmi.toString()}</Text>
        </View>
        
        <View style={styles.dailyLimitContainer}>
            <Text style={styles.help}>You are {parseBMI(bmi)}</Text>
      </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dailyLimitText}>Enter your height and weight</Text>
      <Text style={styles.help}>Height should be in cm and weight in kg</Text>
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        minLength={2}
        maxLength={3} // add maxLength prop to limit input to 4 characters
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        minLength={2}
        maxLength={3} // add maxLength prop to limit input to 4 characters
      />
      <TouchableOpacity style={buttonEnabled ? styles.button : styles.disabledButton} disabled={buttonEnabled ? false : true} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BmiScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4FAFA',
  },
  bmi: {
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
  dailyLimitText: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
