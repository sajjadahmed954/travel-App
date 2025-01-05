// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // // import SplashScreen from './Component/SplashScreen';
// // // import HomeScreen from './Component/HomeScreen';
// // // import ExploreScreen from './Component/ExploreScreen';
// // // import DestinationScreen from './Component/DestinationScreen';
// // // import BookingScreen from './Component/BookingScreen';
// // // import ProfileScreen from './Component/ProfileScreen';
// // // import SignUpScreen from './Component/SignUpScreen';
// // // import LoginScreen from './Component/LoginScreen';
// // // import PlaceDetailScreen from './Component/PlaceDetailScreen';
// // // import PaymentScreen from './Component/PaymentScreen'
// // import LoginScreen from './Components/LoginScreen';
// // import SignUpScreen  from './Components/SignupScreen';
// // import UserDashboard from './Components/UserDashboard';
// // import AdminDashboard from './Components/AdminDashboard';

// // const Stack = createStackNavigator();

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //        <Stack.Navigator initialRouteName="Admin"> 
// //       {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
// //       <Stack.Screen name ="SignUp" component={SignUpScreen}/>
// //       <Stack.Screen name ="Login" component={LoginScreen}/>

// //       <Stack.Screen name ="Admin" component={AdminDashboard}/>
// //       <Stack.Screen name ="User" component={UserDashboard}/>

// //         {/* <Stack.Screen name="Homepage" component={HomeScreen}/>
// //         <Stack.Screen name="Explore" component={ExploreScreen} />
// //         <Stack.Screen name="Destination" component={DestinationScreen} />
// //         <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen}/>
// //         <Stack.Screen name="Booking" component={BookingScreen} />
// //         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
// //         <Stack.Screen
// //           name="Payment"
// //           component={PaymentScreen}  // Ensure this is the correct component
// //           options={{ title: 'Payment' }} */}
        
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }




// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, Button, Alert } from 'react-native';
// // // import auth from '@react-native-firebase/auth';

// // // export default function AuthScreen() {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');

// // //   const handleSignUp = async () => {
// // //     try {
// // //       await auth().createUserWithEmailAndPassword(email, password);
// // //       Alert.alert('Success', 'User registered successfully!');
// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Error', error.message);
// // //     }
// // //   };

// // //   const handleSignIn = async () => {
// // //     try {
// // //       await auth().signInWithEmailAndPassword(email, password);
// // //       Alert.alert('Success', 'Logged in successfully!');
// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Error', error.message);
// // //     }
// // //   };

// // //   return (
// // //     <View style={{ padding: 20 }}>
// // //       <Text>Email</Text>
// // //       <TextInput
// // //         placeholder="Enter your email"
// // //         value={email}
// // //         onChangeText={setEmail}
// // //         style={{ borderBottomWidth: 1, marginBottom: 10 }}
// // //       />
// // //       <Text>Password</Text>
// // //       <TextInput
// // //         placeholder="Enter your password"
// // //         value={password}
// // //         onChangeText={setPassword}
// // //         secureTextEntry
// // //         style={{ borderBottomWidth: 1, marginBottom: 10 }}
// // //       />
// // //       <Button title="Sign Up" onPress={handleSignUp} />
// // //       <Button title="Sign In" onPress={handleSignIn} style={{ marginTop: 10 }} />
// // //     </View>
// // //   );
// // // }



// // // import React, { useState } from 'react';
// // // import { View, Button, Text, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
// // // import DocumentPicker from 'react-native-document-picker';
// // // import firestore from '@react-native-firebase/firestore';

// // // const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dquvcdmqq/upload'; // Your Cloudinary URL
// // // const UPLOAD_PRESET = 'unsigned_preset'; // Your unsigned preset

// // // const App = () => {
// // //   const [uploading, setUploading] = useState(false);
// // //   const [fileUrl, setFileUrl] = useState('');
// // //   const [fileType, setFileType] = useState('');

// // //   const uploadToCloudinary = async (file) => {
// // //     try {
// // //       setUploading(true);

// // //       // Create FormData for Cloudinary
// // //       const data = new FormData();
// // //       data.append('file', {
// // //         uri: file.uri,
// // //         type: file.type,
// // //         name: file.name,
// // //       });
// // //       data.append('upload_preset', UPLOAD_PRESET);

// // //       // Upload file to Cloudinary using fetch
// // //       const response = await fetch(CLOUDINARY_URL, {
// // //         method: 'POST',
// // //         body: data,
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       });

// // //       const result = await response.json();
// // //       setUploading(false);

// // //       if (response.ok) {
// // //         return { url: result.secure_url, type: file.type.split('/')[0] }; // Public URL and type
// // //       } else {
// // //         Alert.alert('Upload failed', result.error.message || 'Unknown error');
// // //         return null;
// // //       }
// // //     } catch (error) {
// // //       setUploading(false);
// // //       Alert.alert('Upload failed', error.message);
// // //       return null;
// // //     }
// // //   };

// // //   const saveToFirestore = async (url) => {
// // //     try {
// // //       await firestore().collection('files').add({
// // //         url,
// // //         createdAt: firestore.FieldValue.serverTimestamp(),
// // //       });
// // //       Alert.alert('Success', 'File URL saved to Firestore');
// // //     } catch (error) {
// // //       Alert.alert('Error saving URL', error.message);
// // //     }
// // //   };

// // //   const handleFileUpload = async () => {
// // //     try {
// // //       // Pick a file using Document Picker
// // //       const file = await DocumentPicker.pickSingle({
// // //         type: [DocumentPicker.types.images, DocumentPicker.types.video],
// // //       });

// // //       const uploadedFile = await uploadToCloudinary(file);
// // //       if (uploadedFile) {
// // //         setFileUrl(uploadedFile.url);
// // //         setFileType(uploadedFile.type);
// // //         await saveToFirestore(uploadedFile.url);
// // //       }
// // //     } catch (error) {
// // //       if (!DocumentPicker.isCancel(error)) {
// // //         Alert.alert('Error', error.message);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       {uploading ? (
// // //         <ActivityIndicator size="large" color="#0000ff" />
// // //       ) : (
// // //         <Button title="Upload File" onPress={handleFileUpload} />
// // //       )}
// // //       {fileUrl ? (
// // //         <View style={styles.previewContainer}>
// // //           {fileType === 'image' ? (
// // //             <Image source={{ uri: fileUrl }} style={styles.previewImage} />
// // //           ) : fileType === 'video' ? (
// // //             <Text style={styles.videoText}>
// // //               Video uploaded successfully. Open the URL in a browser to view it.
// // //             </Text>
// // //           ) : null}
// // //           <Text style={styles.urlText}>URL: {fileUrl}</Text>
// // //         </View>
// // //       ) : null}
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     padding: 20,
// // //   },
// // //   previewContainer: {
// // //     marginTop: 20,
// // //     alignItems: 'center',
// // //   },
// // //   previewImage: {
// // //     width: 200,
// // //     height: 200,
// // //     resizeMode: 'contain',
// // //     marginBottom: 10,
// // //   },
// // //   videoText: {
// // //     fontSize: 16,
// // //     color: 'blue',
// // //     marginBottom: 10,
// // //   },
// // //   urlText: {
// // //     fontSize: 14,
// // //     color: '#555',
// // //   },
// // // });

// // // export default App;





import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';
import ExploreScreen from './Screens/ExploreScreen';
import DestinationScreen from './Screens/DestinationScreen';
import BookingScreen from './Screens/BookingScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SignUpScreen from './Screens/SignUpScreen';
import LoginScreen from './Screens/LoginScreen';
import PlaceDetailScreen from './Screens/PlaceDetailScreen';
import PaymentScreen from './Screens/PaymentScreen';
import AdminPanelScreen from './Screens/AdminPanelScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name ="SignUp" component={SignUpScreen}/>
      <Stack.Screen name ="Login" component={LoginScreen}/>

        <Stack.Screen name="Homepage" component={HomeScreen}/>
        <Stack.Screen name="Explore" component={ExploreScreen} /> 
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen}/>
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name ="Admin Panel" component={AdminPanelScreen}/>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}  
          options={{ title: 'Payment' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




// import React, { useState } from 'react';
// import { View, Button, Text, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import firestore from '@react-native-firebase/firestore';

// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dbfsvlvip/upload'; // Your Cloudinary URL
// const UPLOAD_PRESET = 'unsigned_preset'; // Your unsigned preset

// const App = () => {
//   const [uploading, setUploading] = useState(false);
//   const [fileUrl, setFileUrl] = useState('');
//   const [fileType, setFileType] = useState('');

//   const uploadToCloudinary = async (file) => {
//     try {
//       setUploading(true);

//       // Create FormData for Cloudinary
//       const data = new FormData();
//       data.append('file', {
//         uri: file.uri,
//         type: file.type,
//         name: file.name,
//       });
//       data.append('upload_preset', UPLOAD_PRESET);

//       // Upload file to Cloudinary using fetch
//       const response = await fetch(CLOUDINARY_URL, {
//         method: 'POST',
//         body: data,
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       const result = await response.json();
//       setUploading(false);

//       if (response.ok) {
//         return { url: result.secure_url, type: file.type.split('/')[0] }; // Public URL and type
//       } else {
//         Alert.alert('Upload failed', result.error.message || 'Unknown error');
//         return null;
//       }
//     } catch (error) {
//       setUploading(false);
//       Alert.alert('Upload failed', error.message);
//       return null;
//     }
//   };

//   const saveToFirestore = async (url) => {
//     try {
//       await firestore().collection('files').add({
//         url,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//       Alert.alert('Success', 'File URL saved to Firestore');
//     } catch (error) {
//       Alert.alert('Error saving URL', error.message);
//     }
//   };

//   const handleFileUpload = async () => {
//     try {
//       // Pick a file using Document Picker
//       const file = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images, DocumentPicker.types.video],
//       });

//       const uploadedFile = await uploadToCloudinary(file);
//       if (uploadedFile) {
//         setFileUrl(uploadedFile.url);
//         setFileType(uploadedFile.type);
//         await saveToFirestore(uploadedFile.url);
//       }
//     } catch (error) {
//       if (!DocumentPicker.isCancel(error)) {
//         Alert.alert('Error', error.message);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {uploading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Upload File" onPress={handleFileUpload} />
//       )}
//       {fileUrl ? (
//         <View style={styles.previewContainer}>
//           {fileType === 'image' ? (
//             <Image source={{ uri: fileUrl }} style={styles.previewImage} />
//           ) : fileType === 'video' ? (
//             <Text style={styles.videoText}>
//               Video uploaded successfully. Open the URL in a browser to view it.
//             </Text>
//           ) : null}
//           <Text style={styles.urlText}>URL: {fileUrl}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   previewContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   videoText: {
//     fontSize: 16,
//     color: 'blue',
//     marginBottom: 10,
//   },
//   urlText: {
//     fontSize: 14,
//     color: '#555',
//   },
// });

// export default App;
























