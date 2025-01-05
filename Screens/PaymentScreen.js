import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = ({ route, navigation }) => {
  const { place } = route.params || {};  
  const [amount, setAmount] = useState(place?.price || '');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();

  useEffect(() => {
    if (place && (isNaN(amount) || amount <= 0)) {
      setAmount(place.price || 0); 
    }
  }, [place, amount]);

  const handlePayment = async () => {
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid amount.");
      return;
    }

    if (!accountNumber) {
      Alert.alert("Invalid account", "Please enter your account number.");
      return;
    }

    try {
      setLoading(true);

      await firestore().collection('payments').add({
        placeName: place?.name || 'Unknown Place',
        amount: amount,
        accountNumber: accountNumber,
        paymentMethod: selectedMethod,
        userId: 'user123',
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      setLoading(false);

      Alert.alert(
        "Payment Successful",
        `Payment for ${place?.name || 'Unknown'} of Rs. ${amount} via ${selectedMethod} (Account: ${accountNumber}) was successful!`,
        [{ text: "OK", onPress: () => nav.navigate('UserDashboard') }]
      );
    } catch (error) {
      setLoading(false);
      console.error("Error saving payment to Firestore:", error);
      Alert.alert("Payment Error", "There was an issue processing your payment. Please try again.");
    }
  };

  const renderPaymentFields = () => {
    if (selectedMethod) {
      return (
        <View>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            placeholder={`Enter your ${selectedMethod} account number`}
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={String(amount)}
            onChangeText={(text) => setAmount(text)}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for: {place?.name || 'Thar'}</Text>
      <Text style={styles.price}>Price: Rs.{place?.price|| 5000 }</Text>

      <Text style={styles.paymentTitle}>Select Payment Method:</Text>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => setSelectedMethod('Easypaisa')}
      >
        <Text style={styles.paymentButtonText}>Pay via Easypaisa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => setSelectedMethod('JazzCash')}
      >
        <Text style={styles.paymentButtonText}>Pay via JazzCash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => setSelectedMethod('Bank Transfer')}
      >
        <Text style={styles.paymentButtonText}>Pay via Bank Transfer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => setSelectedMethod('Credit Card')}
      >
        <Text style={styles.paymentButtonText}>Pay via Credit Card</Text>
      </TouchableOpacity>

      {renderPaymentFields()}

      {selectedMethod && (
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.paymentButtonText}>
            {loading ? 'Processing...' : 'Make Payment'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#686e75',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  price: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
  },
  amountInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default PaymentScreen;
