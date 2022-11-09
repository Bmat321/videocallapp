import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CallActionScreen from '../../components/callbutton';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview} />

      <CallActionScreen />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#7b4e80',
    flex: 1,
    position: 'relative',
  },
  cameraPreview: {
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',
    borderRadius: 10,

    position: 'absolute',
    right: 10,
    top: 100,
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 28,
    color: 'white',
  },
});
