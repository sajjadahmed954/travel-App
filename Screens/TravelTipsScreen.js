import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const TravelTipsScreen = () => {
  const navigation = useNavigation();
  const [travelPackages, setTravelPackages] = useState([]);
  const [travelTips, setTravelTips] = useState([]);

  useEffect(() => {
    firestore().collection('packages').get()
      .then(querySnapshot => {
        const packages = querySnapshot.docs.map(doc => doc.data());
        setTravelPackages(packages);
      })
      .catch(error => {
        Alert.alert("Error", "Failed to load travel packages. Please try again later.");
      });

    firestore().collection('tips').get()
      .then(querySnapshot => {
        const tips = querySnapshot.docs.map(doc => doc.data());
        setTravelTips(tips);
      })
      .catch(error => {
        Alert.alert("Error", "Failed to load travel tips. Please try again later.");
      });
  }, []);

  const handleBookPackage = (packageDetails) => {
    Alert.alert(
      "Package Booked",
      `You have successfully booked the package to ${packageDetails.destination}.`,
      [{ text: "OK", onPress: () => navigation.navigate('UserDashboard') }]
    );
  };

  const renderPackageItem = ({ item }) => (
    <View style={styles.packageItem}>
      <Text style={styles.packageTitle}>{item.destination}</Text>
      <Text style={styles.packageDescription}>{item.description}</Text>
      <Text style={styles.packagePrice}>Price: Rs. {item.price}</Text>
      <TouchableOpacity
        style={styles.packageButton}
        onPress={() => handleBookPackage(item)}
      >
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTravelTips = ({ item }) => (
    <View style={styles.tipItem}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Travel Tips & Packages</Text>

      <Text style={styles.sectionTitle}>Travel Packages</Text>
      <Text style={styles.sectionDescription}>Explore a variety of travel packages designed to suit all types of travelers. Whether you're looking for an adventurous getaway, a relaxing beach holiday, or a cultural exploration, our packages offer something for everyone.</Text>
      <FlatList
        data={travelPackages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPackageItem}
      />

      <Text style={styles.sectionTitle}>Travel Tips</Text>
      <Text style={styles.sectionDescription}>Get expert travel tips to make your next trip more enjoyable and stress-free. From packing tips to destination insights, we provide you with everything you need to know before you go.</Text>
      <FlatList
        data={travelTips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTravelTips}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  packageItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  packageDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 5,
  },
  packageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tipItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tipDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default TravelTipsScreen;
