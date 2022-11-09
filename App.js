import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import ContactsScreen from './src/screens/contactScreens'
import CallingScreen from './src/screens/callingScreen'
import CallScreen from './src/screens/callScreen'
import Navigation from './src/navigation'
// import IncomingCallScreen from './src/screens/incomingCallSreen'


const App = () => {
 
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
   <Navigation />
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex:1
  },

})