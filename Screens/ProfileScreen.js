import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const { travelGuide, place } = route.params || {};  

  const [groupSize, setGroupSize] = useState('');

  if (!travelGuide || !place) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: Missing Data</Text>
        <Text style={styles.description}>Travel guide or place data is not available.</Text>
      </View>
    );
  }

  const handleNavigateToBooking = () => {
    const group = parseInt(groupSize, 10);
    if (isNaN(group) || group < 3 || group > 6) {
      Alert.alert("Invalid Group Size", "Please select a group size between 3 and 6 people.");
      return;
    }

    navigation.navigate('Booking', { place, groupSize: group });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{travelGuide.name}'s Profile</Text>
      <Image source={{ uri: travelGuide.imageUrl }} style={styles.profileImage} />
      <Text style={styles.description}>{travelGuide.bio}</Text>
      <Text style={styles.debugText}>Group size: {groupSize}</Text>
      <Text style={styles.groupSizeLabel}>Enter Group Size (3 to 6 people):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={groupSize}
        onChangeText={setGroupSize}
        placeholder="Group size"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToBooking}
      >
        <Text style={styles.buttonText}>View Travel Packages</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  groupSizeLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  debugText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ProfileScreen;
