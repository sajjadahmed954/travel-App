import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserDashboardScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth().signOut()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const [userInfo, setUserInfo] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    firestore().collection('users').doc('user123').get()
      .then(doc => {
        if (doc.exists) {
          setUserInfo(doc.data());
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });

    firestore().collection('bookings').where('userId', '==', 'user123').limit(5).get()
      .then(querySnapshot => {
        const bookings = querySnapshot.docs.map(doc => doc.data());
        setRecentBookings(bookings);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: userInfo.profilePictureUrl }} style={styles.profileImage} />
        <Text style={styles.heading}>Welcome, {userInfo.name || 'User'}!</Text>
      </View>

      {/* Recent Bookings */}
      <Text style={styles.subheading}>Your Recent Bookings</Text>
      <FlatList
        data={recentBookings}
        keyExtractor={(item) => item.bookingId}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.bookingText}>Destination: {item.placeName}</Text>
            <Text style={styles.bookingText}>Date: {item.bookingDate}</Text>
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <LinearGradient colors={['#4e54c8', '#8f94fb']} style={styles.tabBar}>
        {[{ icon: 'home', label: 'Home', screen: 'Home' },
          { icon: 'compass', label: 'Explore', screen: 'Explore' },
          { icon: 'briefcase', label: 'Travel Tips', screen: 'Travel Tips' },
          { icon: 'person', label: 'Profile', screen: 'Profile' }].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tabItem} onPress={() => navigation.navigate(tab.screen)}>
            <Ionicons name={tab.icon} size={30} color="#fff" />
            <Text style={styles.tabLabel}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingBottom: 80, // Added space for the bottom tab bar
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#e28743',
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  bookingItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bookingText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#e28743',
    paddingVertical: 15,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
    
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#4e54c8',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default UserDashboardScreen;
