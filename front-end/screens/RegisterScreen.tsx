/* eslint-disable */

import React, { useState } from 'react';
import { NavigationScreenProp } from "react-navigation";
import { 
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
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Borrower', value: 'borrower'},
    {label: 'Lender', value: 'lender'},
    {label: 'Security Provider', value: 'security provider'}
  ]);

  const login = () => {
      navigation.navigate("Login")
  }

  const submitForm = async (e: any) => {

    try {
      const { data } = await axios.post(
          `/api/users/`, 
          { name, email, password, accountType: dropdownValue }
      );
      navigation.navigate("UserHome");
    } catch (err) {
      console.log("User Already Exists: try again");
    }
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
          return setDropdownValue(newValue);
        }}
        setItems={setItems}
      />
      <TextInput 
        style={styles.textInput}
        placeholderTextColor="#555"
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
        placeholderTextColor="#555"
        placeholder="Email"
        value={email}
        onChangeText={name => setEmail(name)}
      />
      <TextInput 
        style={styles.textInput}
        placeholderTextColor="#555"
        placeholder="Password"
        value={password}
        onChangeText={name => setPassword(name)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginInstead} onPress={login}>
        <Text style={styles.loginInsteadText}>Have an account: Log in instead</Text>
      </TouchableOpacity>
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
  loginInstead: {
      alignItems: "center",
  },
  loginInsteadText: {
      color: "#000",
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
    height: "100%",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 50,
    backgroundColor: "#FFF",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    color: "#000",
    marginBottom: 10,
    paddingHorizontal: 20,
  }
});

export default RegisterScreen;
