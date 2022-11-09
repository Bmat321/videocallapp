import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';

import CallScreen from '../screens/callScreen';
import CallingScreen from '../screens/callingScreen'
import ContactsScreen from '../screens/contactScreens';
import IncomingCallScreen from '../screens/incomingCallSreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';


const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="Calling" component={CallingScreen} />
        <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
       

        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
