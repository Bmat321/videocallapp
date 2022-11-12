import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import contacts from '../../../assets/data/contacts.json';
import {useNavigation} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';

const ContactsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const navigation = useNavigation();

  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCallEvent);
    };
  }, []);

  useEffect(() => {
    const newContacts = contacts.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    //  console.log(newContacts)
    setFilteredContacts(newContacts);
  }, [searchTerm]);

  const call = user => {
    navigation.navigate('Calling', {user});
  };

  return (
    <View style={styles.page}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.search}
        placeholder="Search"
      />
      <FlatList
        data={filteredContacts}
        renderItem={({item}) => (
          <Pressable onPress={() => call(item)}>
            <Text style={styles.contactName}>{item.user_display_name}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  page: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  contactName: {
    marginVertical: 10,
    fontSize: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  search: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
});
