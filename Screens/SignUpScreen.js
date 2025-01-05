

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
    });
  }, []);

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const onSignUp = async () => {
    if (!email || !password || !name) {
      setError('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const signInMethods = await auth().fetchSignInMethodsForEmail(email);

      const adminEmail = 'sajjadahmed.bssempkf22@iba-suk.edu.pk';
      const isAdmin = email.toLowerCase() === adminEmail.toLowerCase();

      if (signInMethods.length > 0) {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          await user.sendEmailVerification();
          setMessage('Verification email sent! Please check your inbox.');
        } else {
          setMessage('Your email is already verified!');
        }

        setIsLoading(false);

        if (isAdmin) {
          navigation.navigate('AdminPanel');
        } else {
          navigation.navigate('Login');
        }
      } else {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
          await user.updateProfile({ displayName: name });
        }

        if (isAdmin) {
          await firestore().collection('admins').doc(user.uid).set({
            name,
            email,
            role: 'admin',
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        } else {
          await firestore().collection('users').doc(user.uid).set({
            name,
            email,
            role: 'user',
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        }

        await user.sendEmailVerification();
        setMessage('Verification email sent! Please check your inbox.');
        setIsLoading(false);

        Alert.alert('Email Verification', 'Please verify your email to continue.');
      }

      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      const adminEmail = 'sajjadahmed.bssempkf22@iba-suk.edu.pk';
      const isAdmin = userCredential.user.email.toLowerCase() === adminEmail.toLowerCase();

      if (isAdmin) {
        await firestore().collection('admins').doc(userCredential.user.uid).set({
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          role: 'admin',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await firestore().collection('users').doc(userCredential.user.uid).set({
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          role: 'user',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      setMessage('Google Sign-In successful!');
      setIsLoading(false);

      if (isAdmin) {
        navigation.navigate('AdminPanel');
      } else {
        navigation.navigate('UserDashboard');
      }
    } catch (err) {
      console.error('Google Sign-In error: ', err);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Google sign-in was cancelled.');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        setError('Google sign-in is in progress.');
      } else {
        setError('An unexpected error occurred with Google sign-in.');
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Screens/Assets/logo.jpg')} style={styles.logo} />
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" placeholderTextColor="#8e8e8e" />
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#8e8e8e" />
      <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#8e8e8e" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoogleSignUp}>
            <Text style={styles.buttonText}>Sign Up with Google</Text>
          </TouchableOpacity>
        </>
      )}
      <Text style={styles.text}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        &copy; 2024 Travel and Tourism. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, backgroundColor: '#6199B3', padding: 15 },
  logo: { width: 100, height: 100, marginBottom: 30, borderRadius: 50, overflow: 'hidden' },
  input: { width: '100%', marginBottom: 10, paddingVertical: 12, paddingLeft: 20, fontSize: 16, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderRadius: 25, color: 'black', elevation: 2 },
  button: { backgroundColor: 'blue', paddingVertical: 15, borderRadius: 30, marginBottom: 10, alignItems: 'center', justifyContent: 'center', width: 320, elevation: 5 },
  buttonText: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  text: { color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  link: { color: '#eeeee4', fontSize: 14, textAlign: 'center' },
  error: { color: 'red', fontSize: 14, textAlign: 'center', marginTop: 10 },
  success: { color: 'green', fontSize: 14, textAlign: 'center', marginTop: 10 },
  footerText: { position: 'absolute', bottom: 20, color: '#ffffff', fontSize: 14, textAlign: 'center' },
});

export default SignUpScreen;
