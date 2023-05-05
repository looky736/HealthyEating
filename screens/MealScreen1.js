import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const API_KEY = 'd1be1f1a5bfd4860b4872daded3101b5';

export default function MealViewer({ route }) {
  const { id } = route.params;
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => setMealDetails(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!mealDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading meal details...</Text>
      </View>
    );
  }

  const { title, image, extendedIngredients, analyzedInstructions, nutrition } = mealDetails;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.mealImage} />
        <Text style={styles.mealTitle}>{title}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {extendedIngredients.map(ingredient => (
          <Text key={ingredient.id}>{ingredient.original}</Text>
        ))}
        <Text style={styles.subtitle}>Instructions:</Text>
        {analyzedInstructions.map(instruction => (
          <View key={instruction.name}>
            <Text style={styles.stepTitle}>{instruction.name}</Text>
            <View style={styles.stepsContainer}>
              {instruction.steps.map(step => (
                <View style={styles.stepContainer} key={step.number}>
                  <Text style={styles.stepText}>{step.step}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        <Text style={styles.subtitle}>Nutrition:</Text>
        <Text>{`Calories: ${nutrition.nutrients.find(n => n.name === 'Calories').amount} kcal`}</Text>
        <Text>{`Fat: ${nutrition.nutrients.find(n => n.name === 'Fat').amount} g`}</Text>
        <Text>{`Carbs: ${nutrition.nutrients.find(n => n.name === 'Carbohydrates').amount} g`}</Text>
        <Text>{`Protein: ${nutrition.nutrients.find(n => n.name === 'Protein').amount} g`}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#D4FAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mealImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  stepsContainer: {
    paddingLeft: 20,
    marginTop: -30,
    left: -14,
  },
});
