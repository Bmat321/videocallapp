import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import bg from '../../../assets/images/ios_bg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Voximplant} from 'react-native-voximplant';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';

const IncomingCallScreen = () => {
  const [caller, setCaller] = useState('');
  const navigation = useNavigation();

  const route = useRoute();
  const {call} = route?.params;

  useEffect(() => {
    try {
      setCaller(call.getEndpoints()[0].displayName);
      call.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('Contacts');
      });

      return () => {
        call.off(Voximplant.CallEvents.Disconnected);
      };
    } catch (error) {}
  }, [call]);

  const onDecline = () => {
    call.decline();
  };

  const onAccept = () => {
    navigation.navigate('Calling', {call, isIncomingCall: true});
  };

  return (
    <View style={styles.page}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
        <Text style={styles.name}>{caller}</Text>
        <Text style={styles.phoneNumber}>WhatsApp ringing</Text>

        <View style={[styles.row, {marginTop: 'auto'}]}>
          <View style={styles.iconContainer}>
            <Ionicons name="alarm" color="white" size={30} />
            <Text style={styles.iconText}>Remind me</Text>
          </View>
          <View style={styles.iconContainer}>
            <Entypo name="message" color="white" size={30} />
            <Text style={styles.iconText}>Message</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Pressable onPress={onDecline} style={styles.iconContainer}>
            <View style={styles.iconButton}>
              <Feather name="x" color="white" size={30} />
            </View>
            <Text style={styles.iconText}>Decline</Text>
          </Pressable>
          <Pressable onPress={onAccept} style={styles.iconContainer}>
            <View style={[styles.iconButton, {backgroundColor: 'green'}]}>
              <Feather name="check" color="white" size={30} />
            </View>
            <Text style={styles.iconText}>Accept</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 28,
    color: 'white',
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 10,
  },
  row: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingBottom: 50,
  },
  iconContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
});
