import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../firebase';

// A dictionary object mapping filter options to meal ids
const filterToMealIds = {
  'Random': [123, 124, 646651, 652417, 632812, 101],
  'Vegan': [642540, 665527, 663559, 633226, 649886, 664501],
  'Vegetarian': [716426, 766453, 782601, 664147, 716406],
  'Gluten free': [644108, 661570, 646512, 1096213, 635055],
  'Budget friendly': [707, 808, 909, 100, 200],
};

export default function MealScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]); //Variable for storing meals
  const [filterIndex, setFilterIndex] = useState(0); //Variable for storing the selected filter index
  const filterOptions = ['Random', 'Vegetarian', 'Vegan', 'Gluten free', 'Budget friendly']; // Array of filter options
  const leftArrow = require('../Leftarrow.png'); // Image source for the left arrow icon
  const rightArrow = require('../Rightarrow.png'); // Image source for the right arrow icon

  useEffect(() => {
    const mealIds = filterToMealIds[filterOptions[filterIndex]]; // Get the meal ids based on the selected filter
    setMeals([]); // Clear the existing meals
    mealIds.map((id) => {
      // Fetch meal data from the database for each meal id
      database.ref('/meals/' + id).once('value', (snapshot) => {
        if (snapshot.val()) {
          // If the snapshot has a value, update the meals state by adding the meal data
          setMeals((meals) => [...meals, snapshot.val()]);
        }
      });
    });
  }, [filterIndex]);

  const handleMealClick = (mealId) => {
    // Navigate to the Meal Viewer screen with the respective meal id
    navigation.navigate('Meal Viewer', { id: mealId });
  };

  const handleFilterClick = () => {
    // Handle click on the filter option, update the filter index. Filter to the right
    const nextFilterIndex = filterIndex === filterOptions.length - 1 ? 0 : filterIndex + 1;
    setFilterIndex(nextFilterIndex);
  };

  const handleLeftArrowClick = () => {
    // Handle click on the left arrow icon, update the filter index. Filer to the left
    const prevFilterIndex = filterIndex === 0 ? filterOptions.length - 1 : filterIndex - 1;
    setFilterIndex(prevFilterIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        {/* View for the filter section */}
        <View style={styles.filter}>
          <TouchableOpacity onPress={handleLeftArrowClick} style={styles.arrow}>
            {/* Left arrow icon */}
            <Image source={leftArrow} style={styles.leftArrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFilterClick}>
            {/* Text displaying the current filter option. Default is random */}
            <Text style={styles.filterText}>{filterOptions[filterIndex]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFilterClick} style={styles.arrow}>
            {/* Right arrow icon */}
            <Image source={rightArrow} style={styles.rightArrow} />
          </TouchableOpacity>
        </View>

        {/* View for displaying the list of meals */}
        <View style={styles.scrollContainer}>
          {meals.map((meal, index) => (
            <TouchableOpacity key={index} onPress={() => handleMealClick(meal.id)}>
              {/* Individual meal container */}
              <View style={styles.mealContainer}>
                {/* Image of the meal */}
                <Image source={{ uri: meal.image }} style={styles.mealImage} />
                {/* Title of the meal to be displayed below image now */}
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
    width: 300,
    height: 180,
    right: 0,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
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
    right: -30,
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



