import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '1b14491645d040e9bcf3a88bc2ee8fe5';

export default function MealScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => setMeals(data.recipes))
      .catch(error => console.log(error));
  }, []);

  const handleMealClick = (mealId) => {
    navigation.navigate('Meal Viewer', { id: mealId });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={true}>
      {meals.map(meal => (
        <TouchableOpacity key={meal.id} onPress={() => handleMealClick(meal.id)}>
          <Image source={{ uri: meal.image }} style={styles.mealImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66D6F7',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mealImage: {
    width: 260,
    height: 180,
    marginVertical: 10,
  },
});
