




import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; 
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '805672801043-ps02c2t6rpvaft2p4qpohsjid4n3pt4s.apps.googleusercontent.com'
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleUser = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      if (!userCredential.user.emailVerified) {
        Alert.alert("Error", "Please verify your email before logging in.");
        await auth().signOut();
        return;
      }

      console.log('Signed in with Google!', userCredential.user);
      Alert.alert('Success', 'Google Sign-In successful!');
      navigation.navigate("HomeScreen");

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;

      const adminEmail = 'sajjadahmed.bssempkf22@iba-suk.edu.pk';
      if (currentUser.email.toLowerCase() === adminEmail.toLowerCase()) {
        navigation.navigate('Homepage');
      } else {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const userRole = userData.role;

          if (userRole === 'admin') {
            navigation.navigate('AdminPanel');  
          } else {
            navigation.navigate('Homepage');  
          }
        } else {
          setError('User data not found in the system.');
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image  
        source={require('../Screens/Assets/logo.jpg')} 
        style={styles.logo}  
      /> 

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#8e8e8e"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#8e8e8e"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onGoogleSignIn} style={styles.googleButton}>
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        &copy; 2024 Travel and Tourism. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6199B3',
    padding: 30,
  },
  logo: {
    width: 100,  
    height: 100, 
    marginBottom: 30,
    borderRadius: 50, 
    overflow: 'hidden', 
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 320,
    elevation: 5,
  },
  googleButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 320,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 320,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  loader: {
    marginTop: 20,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;
