import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'd1be1f1a5bfd4860b4872daded3101b5';

const filterToMealIds = {
  'Random': [124, 646651,123, 652417, 632812, 101],
  'Vegetarian': [ 716426, 766453, 782601, 664147, 716406],
  'Vegan': [ 642540, 665527, 663559, 633226, 649886, 664501],
  'Gluten free': [644108, 661570, 646512, 1096213,  635055],
  'Budget friendly': [707, 808, 909, 100, 200],
};

export default function MealScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);
  const [filter, setFilter] = useState('Random');
  const filterOptions = ['Random', 'Vegetarian', 'Vegan', 'Gluten free', 'Budget friendly'];
  const filterIcon = filter === 'Random' ? '⏷' : '⏵';

  useEffect(() => {
    const mealIds = filterToMealIds[filter];
    const fetchMealPromises = mealIds.map(id => {
      return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.json());
    });
    Promise.all(fetchMealPromises)
      .then(data => setMeals(data))
      .catch(error => console.log(error));
  }, [filter]);

  const handleMealClick = (mealId) => {
    navigation.navigate('Meal Viewer', { id: mealId });
  }

  const handleFilterClick = () => {
    const filterIndex = filterOptions.indexOf(filter);
    const nextFilterIndex = filterIndex === filterOptions.length - 1 ? 0 : filterIndex + 1;
    setFilter(filterOptions[nextFilterIndex]);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={handleFilterClick}>
            <Text style={styles.filterText}>{filterIcon} {filter} {filterIcon}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          {meals.map((meal, index) => (
            <TouchableOpacity key={index} onPress={() => handleMealClick(meal.id)}>
              <Image source={{ uri: meal.image }} style={styles.mealImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66D6F7',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mealImage: {
    width: 260,
    height: 180,
    marginVertical: 10,
  },
  filter: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 10,
    marginRight: 10,
  },
  filterText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
  },
});

