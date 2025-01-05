import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DestinationScreen = () => {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const fetchAdventures = async () => {
    try {
      setLoading(true);
      setError(null);
      const snapshot = await firestore().collection('files').get();

      const adventuresList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Sindh',
          url: data.url || '',
          description: data.description || 'amazing',
          price: data.price || 0,
          stayDuration: data.stayDuration || 5,
          createdAt: data.createdAt ? data.createdAt.toDate().toLocaleString() : 'Unknown date',
        };
      });

      setAdventures(adventuresList);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      setError("There was an issue loading the adventures. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Booking', { adventure: item })}
    >
      {item.url ? (
        <Image source={{ uri: item.url }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.dateText}>{item.createdAt}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price} 1000</Text>
        <Text style={styles.duration}>Stay Duration: {item.stayDuration} days</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchAdventures} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={adventures}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 15,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    elevation: 2,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#2c3e50',
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
    marginTop: 6,
  },
  duration: {
    fontSize: 14,
    color: '#8e44ad',
    marginTop: 6,
  },
  noImageText: {
    fontSize: 14,
    color: '#95a5a6',
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});

export default DestinationScreen;
