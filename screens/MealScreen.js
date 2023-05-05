import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'd1be1f1a5bfd4860b4872daded3101b5';

const filterToMealIds = {
  'Random': [123,124, 646651,652417, 632812, 101],
  'Vegan': [ 642540, 665527, 663559, 633226, 649886, 664501],
  'Vegetarian': [ 716426, 766453, 782601, 664147, 716406],
  'Gluten free': [644108, 661570, 646512, 1096213,  635055],
  'Budget friendly': [707, 808, 909, 100, 200],
};

export default function MealScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);
  const [filterIndex, setFilterIndex] = useState(0);
  const filterOptions = ['Random', 'Vegetarian', 'Vegan', 'Gluten free', 'Budget friendly'];
  const leftArrow = require('../Leftarrow.png');
  const rightArrow = require('../Rightarrow.png');

  useEffect(() => {
    const mealIds = filterToMealIds[filterOptions[filterIndex]];
    const fetchMealPromises = mealIds.map(id => {
      return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.json());
    });
    Promise.all(fetchMealPromises)
      .then(data => setMeals(data))
      .catch(error => console.log(error));
  }, [filterIndex]);

  const handleMealClick = (mealId) => {
    navigation.navigate('Meal Viewer', { id: mealId });
  }

  const handleFilterClick = () => {
    const nextFilterIndex = filterIndex === filterOptions.length - 1 ? 0 : filterIndex + 1;
    setFilterIndex(nextFilterIndex);
  }

  const handleLeftArrowClick = () => {
    const prevFilterIndex = filterIndex === 0 ? filterOptions.length - 1 : filterIndex - 1;
    setFilterIndex(prevFilterIndex);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={handleLeftArrowClick} style={styles.arrow}>
            <Image source={leftArrow} style={styles.leftArrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFilterClick}>
            <Text style={styles.filterText}>{filterOptions[filterIndex]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFilterClick} style={styles.arrow}>
            <Image source={rightArrow} style={styles.rightArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          {meals.map((meal, index) => (
            <TouchableOpacity key={index} onPress={() => handleMealClick(meal.id)}>
              <View style={styles.mealContainer}>
                <Image source={{ uri: meal.image }} style={styles.mealImage} />
                <Text style={styles.mealTitle}>{meal.title}</Text>
              </View>
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
    backgroundColor: '#D4FAFA',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mealContainer: {
    width: 260,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  mealImage: {
    width: 280,
    height: 180,
    right: 0,
    borderWidth: 2,
    borderColor: 'black',
  },  
  filter: {
    alignSelf: 'center',
    backgroundColor: '#F18A8A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 10,
    marginRight: 0,
    width: 140, 
    height: 40,
  },  
  filterText: {
    fontWeight: 'bold',
    color: '#000000',
    justifyContent: 'center',
    right: -15,
    bottom: 18,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
  },
  mealTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 0,
    textAlign: 'center',
  },
  leftArrow:{
    width: 23,
    height: 23,
    left: -40,
    bottom: -2,
  },
  rightArrow:{
    width: 21,
    height: 21,
    right: -132,
    bottom: 38,
  }
});



