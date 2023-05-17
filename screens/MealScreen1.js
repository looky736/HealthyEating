import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import {database} from '../firebase';

export default function MealViewer({ route }) {
  const { id } = route.params;
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    database.ref('/meals/' + id).once('value', (snapshot) => {
      if (snapshot.val()) {
        setMealDetails(snapshot.val())
      }
    });
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
        <Text style={styles.subtitle}>Nutrition (per serving):</Text>
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
