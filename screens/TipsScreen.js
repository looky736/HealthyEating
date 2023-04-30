import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet,Image ,Text, TouchableOpacity, View, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const videoIds = ['pexOIlhT0v0', 'XMcab1MFaLc', '2a50j2Dq57g'];

const TipsScreen = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'videos' && styles.activeTabButton]} onPress={() => setActiveTab('videos')}>
          <Text style={[styles.tabButtonText, activeTab === 'videos' && styles.activeTabButtonText]}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'Reading' && styles.activeTabButton]} onPress={() => setActiveTab('Reading')}>
          <Text style={[styles.tabButtonText, activeTab === 'Reading' && styles.activeTabButtonText]}>Reading</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'videos' ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <View style={styles.content}>
            {videoIds.map((id) => (
              <View style={styles.videoContainer} key={id}>
                <YoutubePlayer
                  height={300}
                  play={false}
                  videoId={id}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
  <View style={styles.textContainer}>
    <Text style={[styles.title]}>Quick Tips</Text>
    <Text style={[styles.text1]}>- Getting your 5 A Day is easier than it sounds!
      Why not chop a banana over your breakfast cereal, or swap your usual mid-morning snack for a piece of fresh fruit? 
      A portion of fresh, canned or frozen fruit and vegetables is 80g. A portion of dried fruit (which should be kept to mealtimes) is 30g.</Text>
    <View style={styles.imageContainer}>
    <Image source={require('../Strawberry.png')} style={styles.image} />
    </View>
    <Text style={[styles.text2]}>- Fish is a good source of protein and contains many vitamins and minerals. 
      Aim to eat at least 2 portions of fish a week, including at least 1 portion of oily fish. 
      Oily fish are high in omega-3 fats, which may help prevent heart disease!</Text>
    <View style={styles.imageContainer}>
    <Image source={require('../Fish.png')} style={styles.image1} />
    </View>
    <Text style={[styles.text3]}>- Try to include at least 1 starchy food with each main meal. 
      Some people think starchy foods are fattening, but gram for gram the carbohydrate they contain provides fewer than half the calories of fat.          </Text>
      <View style={styles.imageContainer}>
    <Image source={require('../Bread.png')} style={styles.image2} />
    </View>
    <Text style={[styles.text4]}>- On average, men should have no more than 30g of saturated fat a day. 
      On average, women should have no more than 20g of saturated fat a day.</Text>
    <Text style={[styles.text5]}>- Eating too much salt can raise your blood pressure. People with high blood 
      pressure are more likely to develop heart disease or have a stroke. Adults and children aged 11 and over should eat no more than 6g of salt 
      (about a teaspoonful) a day.</Text>
      <View style={styles.imageContainer}>
    <Image source={require('../Heart.gif')} style={styles.image3} />
    </View>
    <Text style={[styles.text6]}>- Eating too much salt can raise your blood pressure. People with high blood 
      pressure are more likely to develop heart disease or have a stroke. Adults and children aged 11 and over should eat no more than 6g of salt 
      (about a teaspoonful) a day.</Text>
  </View>
</ScrollView>

      )}
    </View>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D4FAFA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F78766',
    height: 50,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  activeTabButtonText: {
    color: 'black',
  },
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    paddingVertical: 20,
  },
  videoContainer: {
    marginBottom: 60,
    width: '100%',
    aspectRatio: 16 / 9,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text1: {
    fontSize: 16,
    marginBottom: 10,
  },
  text2: {
    fontSize: 16,
    marginBottom: 90,
    top: -70,
  },
  text3: {
    fontSize: 16,
    top: -260,
  },
  text4: {
    fontSize: 16,
    marginBottom: -30,
    top: -340,
  },
  text5: {
    fontSize: 16,
    marginBottom: -30,
    top: -280,
  },
  text6: {
    fontSize: 16,
    marginBottom: -30,
    top: -340,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer1: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    top: -50,
    right: -160,
  },  
  image1: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    top: -225,
    right: -55,
  },  
  image2: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    top: -305,
    left: -105,
  },  
  image3: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    top: -430,
    right: -150,
  },  
});

