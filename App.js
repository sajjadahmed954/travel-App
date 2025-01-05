




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



