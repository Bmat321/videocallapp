import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CallActionScreen from '../../components/callbutton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route?.params?.user
  const goBack = () => {
    navigation.pop();
  };
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
