import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import {database} from '../firebase';

export default function MealViewer({ route }) {
  const { id } = route.params;
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    // Retrieve meal details from the database based on the ID of the meal.
    database.ref('/meals/' + id).once('value', (snapshot) => {
      if (snapshot.val()) {
        // If meal details are available, set the state with the retrieved data
        setMealDetails(snapshot.val())
      }
    });
  }, [id]);

  if (!mealDetails) {
    // If meal details are not available yet, show a loading message. Could maybe get rid of this now.
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
        {/* Display the image of the meal */}
        <Image source={{ uri: image }} style={styles.mealImage} />
        {/* Display the title of the meal */}
        <Text style={styles.mealTitle}>{title}</Text>
        {/* Display the subtitle for ingredients */}
        <Text style={styles.subtitle}>Ingredients:</Text>
        {/* Display each ingredient */}
        {extendedIngredients.map(ingredient => (
          <Text key={ingredient.id}>{ingredient.original}</Text>
        ))}
        {/* Display the subtitle for instructions */}
        <Text style={styles.subtitle}>Instructions:</Text>
        {/* Display each step of the instructions */}
        {analyzedInstructions.map(instruction => (
          <View key={instruction.name}>
            {/* Display the title of the step */}
            <Text style={styles.stepTitle}>{instruction.name}</Text>
            {/* Display the container for the steps */}
            <View style={styles.stepsContainer}>
              {/* Display each step */}
              {instruction.steps.map(step => (
                <View style={styles.stepContainer} key={step.number}>
                  <Text style={styles.stepText}>{step.step}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        {/* Display the subtitle for nutrition */}
        <Text style={styles.subtitle}>Nutrition (per serving):</Text>
        {/* Display each nutrient per serving size for respective meal*/}
        {nutrition.nutrients.map((n, i) => (
          <Text key={i}>{`${n.name}: ${n.amount} ${n.unit} (${n.percentOfDailyNeeds}% of daily intake)`}</Text>
        ))}
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
    marginTop: -40,
    left: -20,
  },
});
