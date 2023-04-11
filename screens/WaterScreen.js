import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const WaterScreen = () => {
  const [cups, setCups] = useState(Array(6).fill(false)); // initial state of all cups to be empty
  const [plantImage, setPlantImage] = useState(require('../Plant1.png')); // initial state of plant image is Plant1 image the saddest plant
  const [plantContainerStyle, setPlantContainerStyle] = useState(styles.plantContainer1);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const countSelectedCups = cups.filter(Boolean).length; // count how many cups are currently selected by the user
    if (countSelectedCups >= 1 && countSelectedCups <= 2) {
      setPlantImage(require('../Plant1.png')); //If first two cups selected show Plant1
      setPlantContainerStyle(styles.plantContainer1);
    } else if (countSelectedCups >= 3 && countSelectedCups <= 4) {
      setPlantImage(require('../Plant2.png')); //If first three and four also selected show Plant2
      setPlantContainerStyle(styles.plantContainer2);
    } else if (countSelectedCups >= 5 && countSelectedCups <= 6) {
      setPlantImage(require('../Plant3.png')); //If first 5 or 6 cups selected show Plant3
      setPlantContainerStyle(styles.plantContainer3);
    }

    if (countSelectedCups === 6) {
      setConfetti(true);
    } else {
      setConfetti(false);
    }

    setWaterConsumed(countSelectedCups * 500);
  }, [cups]);

  const handleCupPress = (index) => {
    if (!cups[index]) {
      if (index === 0 || cups[index - 1]) {
        const newCups = [...cups];
        newCups[index] = true;
        setCups(newCups);
      }
    } else {
      if (cups.slice(index + 1).every((cup) => !cup)) {
        const newCups = [...cups];
        newCups[index] = false;
        setCups(newCups);
      }
    }
  };

  return (
    <View style={styles.container}>
      {confetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          explosionSpeed={3500}
          fallSpeed={5000}
        />
      )}
      <View style={[styles.imageContainer, plantContainerStyle]}>
        <Image source={plantImage} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.cupContainer}>
        {cups.map((cup, index) => (
          <TouchableOpacity key={index} onPress={() => handleCupPress(index)}>
            <Image source={cup ? require('../Water2.png') : require('../Water1.png')} style={styles.cupImage} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.waterConsumedContainer}>
        <Text style={styles.waterConsumedText}>Water consumed:</Text>
        <Text style={styles.waterConsumedNumber}>{waterConsumed} ml</Text>
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
      backgroundColor: '#66D6F7',
    },
    imageContainer: {
      width: 350, 
      height: 350, 
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    plantContainer1: {
      width: 320, 
      height: 320, 
      overflow: 'hidden',
      top: -90,
    },
    plantContainer2: {
      width: 420, 
      height: 420, 
      overflow: 'hidden',
      top: -90,
      right: -12,
    },
    plantContainer3: {
      width: 470, 
      height: 480, 
      overflow: 'hidden',
      top: -24,
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
    waterConsumedContainer: {
      position: 'absolute',
      bottom: 10,
      alignItems: 'center',
    },
    waterConsumedText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    },
  });
  
  
export default WaterScreen;
