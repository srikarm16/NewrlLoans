/* eslint-disable */

import React, { useState } from 'react';
import { NavigationScreenProp } from "react-navigation";
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
import DropDownPicker from 'react-native-dropdown-picker';

interface RegisterScreenProps {
  navigation: NavigationScreenProp<any, any>
};

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [dropdownValue, setDropdownValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Borrower', value: 'borrower'},
    {label: 'Lender', value: 'lender'},
    {label: 'Security Provider', value: 'security provider'}
  ]);

  const submitForm = async (e: any) => {

    console.log("Submitted Form!!");

    const { data } = await axios.post(
        `/api/profile/create-profile`, 
        { name, email, password, accountType: dropdownValue }
    );
    console.log(data);
    console.log(e);

    e.preventDefault();
  }


  return (
    <View style={styles.form}>
      <DropDownPicker style={styles.dropDown}
        placeholder="Select Account Type"
        open={open}
        value={dropdownValue}
        items={items}
        setOpen={setOpen}
        setValue={(newValue) => {
          setDropdownValue(newValue);
        }}
        setItems={setItems}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Name"
        value={name}
        // onBlur={Keyboard.dismiss}
        onChangeText={name => setName(name)}
      />
      {/* <TextInput 
        style={styles.textInput}
        placeholder="Last Name"
        value={lastName}
        // onBlur={Keyboard.dismiss}
        onChangeText={name => setLastName(name)}
      /> */}
      <TextInput 
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={name => setEmail(name)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={name => setPassword(name)}
        secureTextEntry
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
  dropDown: {
    marginBottom: 10,
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

export default RegisterScreen;