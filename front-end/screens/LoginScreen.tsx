import React, { useEffect, useState } from "react";
import { NavigationScreenProp } from "react-navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  login
} from "../actions/userActions";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native"

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigation.navigate("UserHome");
    }
  }, [navigation, userInfo]);

  const dispatch = useDispatch();

  const register = () => {
      navigation.navigate("Register");
  }

  const submitForm = async () => {
    dispatch(login(email, password));
  }


  return (
    <View style={styles.form}>
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
      <TouchableOpacity style={styles.loginInstead} onPress={register}>
        <Text style={styles.loginInsteadText}>Don't have an account: Register instead</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createProfile} onPress={submitForm}>
        <Text>Log In</Text>
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

export default LoginScreen;
