import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CallActionScreen from '../../components/callbutton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';

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
  const {user, call: incomingCall, isIncomingCall} = route?.params;
  const call = useRef(incomingCall);
  const goBack = () => {
    navigation.pop();
  };

  const voximplant = Voximplant.getInstance();

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

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    try {
      callSettings = {
        video: {
          sendVideo: true,
          receiveVideo: true,
        },
      };

      const makeCall = async () => {
        call.current = await voximplant.call(user.user_name, callSettings);
        subScribeToCallEvents();
      };

      const answerCall = async () => {
        subScribeToCallEvents();
        call.current.answer(callSettings);
      };

      const subScribeToCallEvents = () => {
        call.current.on(Voximplant.CallEvents.Failed, callEvent => {
          showError(callEvent.reason);
        });

        call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
          setCallStatus('Calling...');
        });
        call.current.on(Voximplant.CallEvents.Connected, callEvent => {
          setCallStatus('Connected');
        });
        call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
          navigation.navigate('Contacts');
        });
      };

      const showError = reason => {
        Alert.alert(`Call Failed`, `Reason: ${reason}`, [
          {
            text: 'Ok',
            onPress: navigation.navigate('Contacts'),
          },
        ]);
      };

      if (isIncomingCall) {
        answerCall();
      } else {
        makeCall();
      }

      return () => {
        call.current.off(Voximplant.CallEvents.Failed);
        call.current.off(Voximplant.CallEvents.ProgressToneStart);
        call.current.off(Voximplant.CallEvents.Connected);
        call.current.off(Voximplant.CallEvents.Disconnected);
      };
    } catch (error) {}
  }, [permissionGranted, call.current]);

  const onHangup = () => {
    call.current.hangup();
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back" color="white" size={25} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>{callStatus}</Text>
      </View>
      <CallActionScreen onHangup={onHangup} />
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
