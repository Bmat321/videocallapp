import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';

import {ACC_NAME, APP_NAME} from '../../Constant';

import {Voximplant} from 'react-native-voximplant';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const connect = async () => {
      try {
        const status = await voximplant.getClientState();
        console.log(status);
        if (status === Voximplant.ClientState.DISCONNECTED) {
          await voximplant.connect();
        } else if (status === Voximplant.ClientState.LOGGED_IN) {
          return redirectHome();
        }
      } catch (error) {}
    };
    connect();
  }, []);

  const signIn = async () => {
    try {
      const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(fqUsername, password);

      redirectHome();
    } catch (e) {
      console.log(e.name + e.message);
      Alert.alert(e.name, `Error Code: ${e.code}`);
    }
  };

  const redirectHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Contacts',
        },
      ],
    });
  };
  return (
    <View style={styles.page}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="username"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.press} onPress={signIn}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'stretch',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  press: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
});
