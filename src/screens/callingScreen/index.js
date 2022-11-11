import {
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CallActionScreen from '../../components/callbutton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const user = route?.params?.user;
  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const getPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        const recordAudioGranted =
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
        const cameraGranted =
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
        if (!cameraGranted || !recordAudioGranted) {
          Alert.alert('Permissions not granted');
        } else {
          setPermissionGranted(true);
        }
      } catch (error) {}
    };
    if (Platform.OS === 'android') {
      getPermission();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back" color="white" size={25} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>ringing +23475210475</Text>
      </View>
      <CallActionScreen />
    </View>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#7b4e80',
    height: '100%',
    position: 'relative',
  },
  cameraPreview: {
    backgroundColor: '#7b4e80',
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 28,
    color: 'white',
  },

  backButton: {
    marginTop: 10,
  },
});
