import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    
    const fetchImageUrlFromFirestore = async () => {
      try {
        
        const documentSnapshot = await firestore()
          .collection('files') 
          .doc('imageDocument')  
          .get();

        const imageUrlFromFirestore = documentSnapshot.get('imageUrl');
        setImageUrl(imageUrlFromFirestore); 
      } catch (error) {
        console.error('Error fetching image URL from Firestore:', error);
      }
    };

    fetchImageUrlFromFirestore(); 

    const timer = setTimeout(() => {
      navigation.replace('SignUp');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.logo} />
      ) : (
        <Text style={styles.text}>Loading Image...</Text> 
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
  },
  logo: {
    width: 380,
    height: 745,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
