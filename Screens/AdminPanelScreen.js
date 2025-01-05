import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const AdminPanelScreen = () => {
  const navigation = useNavigation();

  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ title: '', description: '', destination: '', type: '' });
  const [showInputFields, setShowInputFields] = useState(false);
  const [uploading, setUploading] = useState(false);

  const addActivity = async () => {
    if (newActivity.title && newActivity.description && newActivity.destination && newActivity.type) {
      try {
        const activityData = {
          title: newActivity.title,
          description: newActivity.description,
          destination: newActivity.destination,
          type: newActivity.type,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        const activityRef = firestore().collection('categories').doc();
        await activityRef.set(activityData);

        setActivities([...activities, { id: activityRef.id, ...activityData }]);
        setNewActivity({ title: '', description: '', destination: '', type: '' });
        setShowInputFields(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to add activity to Firestore: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Please fill all fields!');
    }
  };

  const deleteActivity = async (id) => {
    try {
      await firestore().collection('categories').doc(id).delete();
      setActivities(activities.filter(activity => activity.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete activity: ' + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categories')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const fetchedActivities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(fetchedActivities);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>

      {/* Add New Activity Button */}
      <TouchableOpacity style={styles.addNewButton} onPress={() => setShowInputFields(!showInputFields)}>
        <Text style={styles.addNewButtonText}>Add New Activity</Text>
      </TouchableOpacity>

      {/* Conditionally show input fields */}
      {showInputFields && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Activity Title"
            value={newActivity.title}
            onChangeText={(text) => setNewActivity({ ...newActivity, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Activity Description"
            value={newActivity.description}
            onChangeText={(text) => setNewActivity({ ...newActivity, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={newActivity.destination}
            onChangeText={(text) => setNewActivity({ ...newActivity, destination: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Activity Type (Adventure, Religious, Trending)"
            value={newActivity.type}
            onChangeText={(text) => setNewActivity({ ...newActivity, type: text })}
          />

          <TouchableOpacity style={styles.addButton} onPress={addActivity}>
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.activityDescription}>{item.description}</Text>
            <Text style={styles.activityDetails}>Destination: {item.destination}</Text>
            <Text style={styles.activityDetails}>Type: {item.type}</Text>

            <View style={styles.activityActions}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteActivity(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Circle Floating Buttons (Image Upload, Video Upload, Delete Activity, User Detail) */}
      <View style={styles.circleButtonsContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={() => alert('Image Upload')}>
          <Ionicons name="image" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleButton} onPress={() => alert('Video Upload')}>
          <Ionicons name="videocam" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleButton} onPress={() => alert('Delete Activity')}>
          <Ionicons name="trash" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('UserDetail')}>
          <Ionicons name="person" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Static Tab Bar with Custom Home Icon */}
      <LinearGradient
        colors={['#323142', '#82A7BD']}
        style={styles.tabBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {[{ icon: 'home', label: 'Home' },
          { icon: 'compass', label: 'Explore' },
          { icon: 'briefcase', label: 'Travel Tips' },
          { icon: 'person', label: 'Profile' }].map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tabItem} onPress={() => navigation.navigate(tab.label)}>
              <Image source={{uri: `https://img.icons8.com/ios/50/ffffff/${tab.icon}.png`}} style={{width: 30, height: 30}} />
              <Text style={styles.tabLabel}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 20,
    background: 'linear-gradient(to bottom, #f0f4f8, #e0e4e9)', // Gradient Background
  },
  header: {
    fontSize: 28, // Reduced size for better proportion
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2c3e50',
  },
  addNewButton: {
    backgroundColor: '#3498db',
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  addNewButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  formContainer: {
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12, // Increased radius for a modern feel
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10, // Larger shadow for better depth
  },
  activityTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
  },
  activityDescription: {
    fontSize: 16,
    marginTop: 10,
    color: '#34495e',
  },
  activityDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#7f8c8d',
  },
  activityActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  circleButtonsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    flexDirection: 'column',
    alignItems: 'center',
  },
  circleButton: {
    backgroundColor: '#3498db',
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5, // Shadow for depth
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(50, 50, 50, 0.8)', // Semi-transparent background
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AdminPanelScreen;
