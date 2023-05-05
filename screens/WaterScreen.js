import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {database, auth, getDate} from '../firebase';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50,
      backgroundColor: '#D4FAFA',
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
      top: 140,
    },
    plantContainer2: {
      width: 420, 
      height: 420, 
      overflow: 'hidden',
      bottom: -40,
      right: -11,
    },
    plantContainer3: {
      width: 470, 
      height: 480, 
      overflow: 'hidden',
      bottom: -24,
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
    congratulationsContainer: {
        position: 'absolute',
        top: 30,
        alignItems: 'center',
      },
      congratulationsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
      },
      congratulationsSubtext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
      },    
});

export default function WaterScreen(){
  const [cups, setCups] = useState(Array(6).fill(false)); // initial state of all cups to be empty
  const [plantImage, setPlantImage] = useState(require('../Plant1.png')); // initial state of plant image is Plant1 image the saddest plant
  const [plantContainerStyle, setPlantContainerStyle] = useState(styles.plantContainer1);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [confetti, setConfetti] = useState(false);


  function getWater(){
    const countSelectedCups = cups.filter(Boolean).length; // count how many cups are currently selected by the user
      let plantImageSource = require('../Plant1.png');
      let plantContainerStyle = styles.plantContainer1;
      
      if (countSelectedCups >= 1 && countSelectedCups <= 2) {
        plantImageSource = require('../Plant1.png'); //If first two cups selected show Plant1
        plantContainerStyle = styles.plantContainer1;
      } else if (countSelectedCups >= 3 && countSelectedCups <= 4) {
        plantImageSource = require('../Plant2.png'); //If first three and four also selected show Plant2
        plantContainerStyle = styles.plantContainer2;
      } else if (countSelectedCups >= 5 && countSelectedCups <= 6) {
        plantImageSource = require('../Plant3.png'); //If first 5 or 6 cups selected show Plant3
        plantContainerStyle = styles.plantContainer3;
      }
      
      setPlantImage(plantImageSource);
      setPlantContainerStyle(plantContainerStyle);
    
      if (countSelectedCups === 6) {
        setConfetti(true);
      } else {
        setConfetti(false);
      }
    
      setWaterConsumed(countSelectedCups * 500);
  }

  //get water consumed only when screen loads
  database.ref('users/' + auth.currentUser.uid + '/' + getDate()).once('value', (snapshot) => {
    if (snapshot.val()) {
      const cupsConsumed = Math.floor(snapshot.val().water / 500);
      cups.splice(0, cupsConsumed, ...Array(cupsConsumed).fill(true));
      getWater()
    }
  });

  useEffect(() => {
    getWater()
  }, [cups]);
  

  const handleCupPress = (index) => {
    if (!cups[index]) {
      if (index === 0 || cups[index - 1]) {
        //Add cup
        const newCups = [...cups];
        newCups[index] = true;
        setCups(newCups);
        database.ref('users/' + auth.currentUser.uid + '/' + getDate()).update({
          water: waterConsumed + 500,
        });
      }
    } else {
      if (cups.slice(index + 1).every((cup) => !cup)) {
        //Remove cup
        const newCups = [...cups];
        newCups[index] = false;
        setCups(newCups);
        database.ref('users/' + auth.currentUser.uid + '/' + getDate()).update({
          water: waterConsumed - 500,
        });
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
        {
        cups.map((cup, index) => (
          <TouchableOpacity key={index} onPress={() => handleCupPress(index)}>
            <Image source={cup ? require('../Water2.png') : require('../Water1.png')} style={styles.cupImage} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.waterConsumedContainer}>
        <Text style={styles.waterConsumedText}>Water consumed:</Text>
        <Text style={styles.waterConsumedNumber}>{waterConsumed} ml</Text>
      </View>
      {confetti && (
        <View style={styles.congratulationsContainer}>
          <Text style={styles.congratulationsText}>Congratulations!</Text>
          <Text style={styles.congratulationsSubtext}>You've reached your daily intake</Text>
        </View>
      )}
    </View>
  );
        };
