import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const BookingScreen = ({ route, navigation }) => {
  const { place } = route.params || {}; 
  const imageSource = place?.image || 'https://example.com/default-image.jpg';

  const handleBooking = () => {
    navigation.navigate('Payment', { place });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: imageSource }} style={styles.image} />
        <Text style={styles.title}>{place?.name || 'Sindh'}</Text>
        <Text style={styles.price}>Rs. {place?.price || '5000'}</Text>
        <Text style={styles.description}>{place?.description || 'Enjoy you journey with amazing family and freinds of Sindh'}</Text>

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#686e75',
  },
  card: {
    backgroundColor: '#686e75',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
