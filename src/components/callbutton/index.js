import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallActionScreen = ({onHangup}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicroOn, setIsMicroOn] = useState(true);

  const onReverseCamera = () => {
    console.warn('onReverseCamera');
  };
  const onToggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };
  const onToggleMicrophone = () => {
    setIsMicroOn(prev => !prev);
  };


  return (
    <View style={styles.buttonsContainer}>
      <Pressable onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="ios-camera-reverse" size={30} color="white" />
      </Pressable>
      <Pressable onPress={onToggleCamera} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isCameraOn ? 'camera-off' : 'camera'}
          size={30}
          color="white"
        />
      </Pressable>
      <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isMicroOn ? 'microphone-off' : 'microphone'}
          size={30}
          color="white"
        />
      </Pressable>
      <Pressable onPress={onHangup} style={[styles.iconButton, styles.hangup]}>
        <MaterialCommunityIcons name="phone-hangup" size={30} color="white" />
      </Pressable>
    </View>
  );
};

export default CallActionScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: '#333333',
    padding: 20,
    borderTopLeftRadius: 15,
    paddingBottom: 40,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 50,
    padding: 15,
  },
  hangup: {
    backgroundColor: 'red',
  },
});
