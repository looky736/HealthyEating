import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const WaterScreen = () => {
  const [cups, setCups] = useState(Array(6).fill(false)); // initial state of all cups to be empty
  const [plantImage, setPlantImage] = useState(require('../Plant1.png')); // initial state of plant image is Plant1 image the saddest plant

  useEffect(() => {
    const countSelectedCups = cups.filter(Boolean).length; // count how many cups are currently selected by the user
    if (countSelectedCups >= 1 && countSelectedCups <= 2) setPlantImage(require('../Plant1.png')); //If first two cups selected show Plant1
    else if (countSelectedCups >= 3 && countSelectedCups <= 4) setPlantImage(require('../Plant2.png')); //If first three and four also selected show Plant2
    else if (countSelectedCups >= 5 && countSelectedCups <= 6) setPlantImage(require('../Plant3.png')); //If first 5 or 6 cups selected show Plant3 
  }, [cups]);

  const handleCupPress = (index) => {
    if (!cups[index]) { // if the cup is not filled, fill it
      if (index === 0 || cups[index - 1]) {
        const newCups = [...cups];
        newCups[index] = true;
        setCups(newCups);
      }
    } else { // if the cup is filled, empty it (only want it from right to left)
      if (cups.slice(index + 1).every((cup) => !cup)) {
        const newCups = [...cups];
        newCups[index] = false;
        setCups(newCups);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={plantImage} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.cupContainer}>
        {cups.map((cup, index) => (
          <TouchableOpacity key={index} onPress={() => handleCupPress(index)}>
            <Image source={cup ? require('../Water2.png') : require('../Water1.png')} style={styles.cupImage} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: '#246EE9',
  },
  imageContainer: {
    width: 350, 
    height: 350, 
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cupContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    width: '100%',
  },
  cupImage: {
    width: 50,
    height: 50,
  },
});

export default WaterScreen;
