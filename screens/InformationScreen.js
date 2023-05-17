import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../Logo.png')} style={styles.logo} />
      <Text style={styles.text}>
        Healthy Habits was founded in May 2023 with a simple and relentless goal of providing a platform so that people can become healthier by changing small habits in your lifestyle.{'\n\n'}
        This app can allow you to do many things. Take a look at the different types of healthy meals we display for cooking. Find out the nutritional info of a meal and its ingredients.{'\n\n'}
        Track your calories and remind yourself of how many calories you have left to eat. You can even set your personal daily goal!{'\n\n'}
        Use our water tracker to make sure you get your daily water intake, and be sure to look after your plant!{'\n\n'}
        View our tips and tricks on what you can do to become a healthier and happier person and find out your BMI while you're at it!{'\n\n'}
        I hope you have fun using Healthy Habits!
      </Text>
    </View>
  );
};

export default InfoScreen;

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
    marginTop: 10,
    marginBottom: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 10,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});
