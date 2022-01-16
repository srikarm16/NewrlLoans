/* eslint-disable */

import React, { useState } from 'react';
import { 
  Button, 
  Keyboard,
  ScrollView,
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity,
  View 
} from 'react-native';
import axios from 'axios';

const AccountCreation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const submitForm = async (e) => {

    const baseUrl = "https://random"; //NEEDS TO CHANGE

    const { data } = await axios.post(
        `${baseUrl}/api/profile/create-profile`, 
        { firstName, lastName}
    );
    console.log(data);
    console.log(e);

    e.preventDefault();
  }

  return (
    <View style={styles.form}>
      <TextInput 
        style={styles.textInput}
        placeholder="First Name"
        // onBlur={Keyboard.dismiss}
        onChangeText={name => setFirstName(name)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Last Name"
        // onBlur={Keyboard.dismiss}
        onChangeText={name => setLastName(name)}
      />
      <TouchableOpacity style={styles.createProfile} onPress={submitForm}>
        <Text>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  createProfile: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 20,
  },
  createProfileText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  form: {
    height: 100,
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 10,
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
  }
});

export default AccountCreation;