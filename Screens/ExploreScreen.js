// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; // For gradient effect
// import firestore from '@react-native-firebase/firestore'; // Firestore integration

// const ExploreScreen = ({ navigation }) => {
//   const [files, setFiles] = useState([]); // Renaming to 'files' to match the collection
//   const [loading, setLoading] = useState(true);
//   const [numColumns, setNumColumns] = useState(2); // Default to 2 columns

//   // Adjust numColumns based on screen width (optional)
//   useEffect(() => {
//     const { width } = Dimensions.get('window');
//     if (width > 600) {
//       setNumColumns(3); // Use 3 columns for larger screens (e.g., tablets)
//     } else {
//       setNumColumns(2); // Use 2 columns for smaller screens (e.g., phones)
//     }
//   }, []);

//   // Fetch files data from Firestore
//   const fetchFiles = async () => {
//     try {
//       setLoading(true);
//       const filesSnapshot = await firestore().collection('files').get(); // Change collection name to 'files'
//       const filesList = filesSnapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           url: data.url, // Assuming 'url' contains the image URL
//           description: data.description, // Assuming 'description' contains the image description
//           createdAt: data.createdAt,
//         };
//       });
//       setFiles(filesList);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//       Alert.alert('Error', 'Failed to load files');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   // Render each file's card in a grid
//   const renderFileItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('Destination', { file: item })} // Navigate to file details screen
//     >
//       {/* Use linear gradient for card background */}
//       <LinearGradient
//         colors={['#f3f4f6', '#e1e6f0']} // Gradient for background (light pastel tones)
//         style={styles.cardGradient}
//       >
//         {/* Render image if URL exists */}
//         {item.url ? (
//           <Image
//             source={{ uri: item.url }} // Use the 'url' from fetched data
//             style={styles.cardImage}
//           />
//         ) : (
//           <View style={styles.fallbackImage}>
//             <Text style={styles.fallbackText}>No Image</Text> {/* Ensure "No Image" is wrapped in <Text> */}
//           </View>
//         )}
//         <View style={styles.cardDetails}>
//           {/* Display the image description here instead of File ID */}
//           {/* <Text style={styles.descriptionText}>{item.description || 'No description available'}</Text> */}
//           {/* Optionally, show the creation date or other metadata */}
//           <Text style={styles.metadataText}>{item.createdAt ? `Uploaded on: ${item.createdAt.toDate().toLocaleDateString()}` : 'Date not available'}</Text>
//         </View>
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
//       ) : (
//         <>
//           <Text style={styles.title}>Explore Files</Text>
//           <FlatList
//             data={files}
//             keyExtractor={(item) => item.id}
//             renderItem={renderFileItem}
//             numColumns={numColumns} // Using the dynamic numColumns state
//             key={numColumns} // Change key prop to reset the FlatList when numColumns changes
//             contentContainerStyle={styles.flatListContainer}
//             columnWrapperStyle={styles.columnWrapper} // Styling for column spacing
//           />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#ffffff',  // White background for a clean look
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#333',  // Dark text for good contrast
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   card: {
//     flex: 1,
//     marginBottom: 15,
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: '#000',  // Subtle shadow for a clean card effect
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     marginHorizontal: 10,
//     elevation: 5, // Android shadow
//   },
//   cardGradient: {
//     flexDirection: 'column', // Stack content vertically
//     borderRadius: 12,
//     padding: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardImage: {
//     width: '100%',
//     height: 150,  // Reduced height for images to provide a more compact view
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: '#dcdcdc',  // Default background if image fails
//   },
//   fallbackImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',  // Fallback background color
//   },
//   fallbackText: {
//     color: '#999',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   cardDetails: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//     paddingHorizontal: 5,
//   },
//   descriptionText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#444', // Slightly darker text for description
//     textAlign: 'center',
//     marginTop: 5,
//     marginBottom: 8, // Space between description and date
//     paddingHorizontal: 10,
//   },
//   metadataText: {
//     fontSize: 12,
//     fontWeight: '400',
//     color: '#888',  // Lighter color for metadata
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   flatListContainer: {
//     paddingBottom: 20,
//   },
//   columnWrapper: {
//     justifyContent: 'space-between', // Even spacing between columns
//   },
// });

// export default ExploreScreen;





import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

const ExploreScreen = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const { width } = Dimensions.get('window');
    if (width > 600) {
      setNumColumns(3);
    } else {
      setNumColumns(2);
    }
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const filesSnapshot = await firestore().collection('files').get();
      const filesList = filesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          url: data.url,
          description: data.description,
          createdAt: data.createdAt,
        };
      });
      setFiles(filesList);
    } catch (error) {
      console.error("Error fetching files:", error);
      Alert.alert('Error', 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const renderFileItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Destination', { file: item })}
    >
      <LinearGradient
        colors={['#f3f4f6', '#e1e6f0']}
        style={styles.cardGradient}
      >
        {item.url ? (
          <Image
            source={{ uri: item.url }}
            style={styles.cardImage}
          />
        ) : (
          <View style={styles.fallbackImage}>
            <Text style={styles.fallbackText}>No Image</Text>
          </View>
        )}
        <View style={styles.cardDetails}>
          <Text style={styles.metadataText}>{item.createdAt ? `Uploaded on: ${item.createdAt.toDate().toLocaleDateString()}` : 'Date not available'}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : (
        <>
          <Text style={styles.title}>Explore Files</Text>
          <FlatList
            data={files}
            keyExtractor={(item) => item.id}
            renderItem={renderFileItem}
            numColumns={numColumns}
            key={numColumns}
            contentContainerStyle={styles.flatListContainer}
            columnWrapperStyle={styles.columnWrapper}
          />
        </>
      )}

      <LinearGradient
        colors={['#4e54c8', '#8f94fb']}
        style={styles.tabBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {[{ icon: 'location', label: 'Destination', screen: 'Destination' },
          { icon: 'calendar', label: 'Booking', screen: 'Booking' },
          { icon: 'wallet', label: 'Payment', screen: 'Payment' }].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tabItem} onPress={() => navigation.navigate(tab.screen)}>
            <Image source={{ uri: `https://img.icons8.com/ios/50/ffffff/${tab.icon}.png` }} style={styles.icon} />
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
    padding: 15,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  card: {
    flex: 1,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginHorizontal: 10,
    elevation: 5,
  },
  cardGradient: {
    flexDirection: 'column',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#dcdcdc',
  },
  fallbackImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  fallbackText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  cardDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  metadataText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ExploreScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore'; // Import Firestore

// const ExploreScreen = ({ navigation }) => {
//   const [destinations, setDestinations] = useState([]); // State to store destinations from Firestore

//   const fetchDestinations = async () => {
//     try {
//       const snapshot = await firestore()
//         .collection('files') // Fetch from 'files' collection
//         .get(); // Fetch all documents
      
//       const fetchedDestinations = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(), // Get all data from the document
//       }));
//       setDestinations(fetchedDestinations); // Update state with the fetched data
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     }
//   };

//   // Fetch destinations from Firestore when the component mounts
//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Explore Destinations</Text>

//       <FlatList
//         data={destinations} // Use Firestore fetched data
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate('Destination', { destination: item })}
//           >
//             {/* Check if imageUrl exists before rendering */}
//             {item.imageUrl ? (
//               <Image 
//                 source={{ uri: item.imageUrl }} // Use image URL fetched from Firestore
//                 style={styles.cardImage}
//               />
//             ) : (
//               <View style={styles.placeholderImage}>
//                 <Text style={styles.placeholderText}>No Image Available</Text>
//               </View>
//             )}
//             <View style={styles.cardDetails}>
//               <Text style={styles.cityName}>{item.name}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#686e75', // Background color for the container
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   card: {
//     flexDirection: 'row', 
//     marginBottom: 20,
//     backgroundColor: '#686e75',
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 1,
//   },
//   cardImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 10,
//   },
//   placeholderImage: {
//     width: 120,
//     height: 120,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   placeholderText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   cardDetails: {
//     flex: 1,
//     padding: 5.5,
//     justifyContent: 'center',
//   },
//   cityName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   description: {
//     fontSize: 14,
//     color: 'white',
//     marginTop: 5,
//   },
// });

// export default ExploreScreen;
