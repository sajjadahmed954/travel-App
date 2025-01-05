import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Button, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(false);
      const categorySnapshot = await firestore().collection('categories').get();
      const categoryList = categorySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description || "No description available",
          images: data.url ? [data.url] : [],
        };
      });
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImagePress = (imageUrl) => {
    navigation.navigate('Explore', { imageUrl });
  };

  const onSearch = (query) => {
    setSearchQuery(query);
    const filteredCategories = categories.filter(category =>
      category.title.toLowerCase().includes(query.toLowerCase())
    );
    setCategories(filteredCategories);
  };

  const handleRetry = () => {
    fetchCategories();
  };

  const renderCategoryItem = ({ item }) => {
    if (item.images.length === 0) {
      return <Text style={styles.noImagesText}>No images available for this category.</Text>;
    }

    return (
      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryDescription}>{item.description}</Text>
        <FlatList
          data={item.images}
          horizontal
          keyExtractor={(imageUrl, idx) => imageUrl}
          renderItem={({ item: imageUrl }) => (
            <TouchableOpacity onPress={() => handleImagePress(imageUrl)} style={styles.imageContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                onError={() => console.warn('Image failed to load')}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const tabs = [
    { image: require('../Screens/Assets/home.png'), label: 'Home', screen: 'Home' },
    { image: require('../Screens/Assets/explore.png'), label: 'Explore', screen: 'Explore' },
    { image: require('../Screens/Assets/tips.png'), label: 'Travel Tips', screen: 'Travel Tips' },
    { image: require('../Screens/Assets/profile.png'), label: 'Profile', screen: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image source={require('../Screens/Assets/menu.png')} name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Home</Text>
        <View style={styles.menuIconPlaceholder}></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.featuredContainer}>
          <Text style={styles.featuredTitle}>Featured Destinations</Text>
          <FlatList
            data={categories.slice(0, 5)}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImagePress(item.images[0])} style={styles.featuredItem}>
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <Text style={styles.featuredText}>{item.title}</Text>
                <Text style={styles.featuredDescription}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Searchbar
          placeholder="Search destinations..."
          onChangeText={onSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#FF6347" style={styles.loadingIndicator} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load categories. Please try again.</Text>
            <Button title="Retry" onPress={handleRetry} />
          </View>
        ) : categories.length === 0 ? (
          <Text style={styles.noCategoriesText}>No categories available.</Text>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </ScrollView>

      <LinearGradient
        colors={['#4e54c8', '#8f94fb']}
        style={styles.tabBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tabItem} onPress={() => navigation.navigate(tab.screen)}>
            <Image source={tab.image} style={{ width: 30, height: 30 }} />
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
    backgroundColor: '#f9f9f9',
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#4e54c8',
    padding: 10,
    paddingHorizontal: 20,
    
    
    
  },
  menuTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    //right:'45%'
  },
  menuIconPlaceholder: {
    width: 30,
    
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 2,
    
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
    elevation: 4,
  },
  noCategoriesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 50,
  },
  flatListContainer: {
    paddingBottom: 70,
  },
  categoryCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
   // elevation: 5,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
   // elevation: 4,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 12,
  },
  noImagesText: {
    color: '#888',
    fontStyle: 'italic',
  },
  featuredContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    color: '#333',
  },
  featuredItem: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  featuredImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
  },
  featuredText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  featuredDescription: {
    fontSize: 14,
    color: '#777',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
  },
});

export default HomeScreen;
