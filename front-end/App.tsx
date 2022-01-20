/* eslint-disable */

import React from 'react';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import RegisterAssetForm from './screens/UserHomeScreens/RegisterAssetForm';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios"
import store from "./store";
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://192.168.1.34:5000" 
// axios.defaults.baseURL = "http://localhost:5000"

const Stack = createNativeStackNavigator();

// const MainStack = StackNavigator({
//   Login: {
//     screen: Login,
//     navigationOptions: {
//       title: "Login",
//       headerLeft: ()=>null
//     },
//   },
//   // ... other screens here
// })

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register" screenOptions={{headerBackVisible: false, headerBackButtonMenuEnabled: false}}>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UserHome" component={UserHomeScreen} />
          <Stack.Screen name="RegisterAssetForm" component={RegisterAssetForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, { useState } from 'react';
// import {
//     Alert,
//     Button,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
// import Auth0 from 'react-native-auth0';

// const auth0 = new Auth0({ 
//   domain: 'dev-an26gea1.us.auth0.com', 
//   clientId: 'AAixT5vrWI2kqT7VlrZyWlhpALlUL6fK' 
// });
 
//  const App = () => {
 
//      let [accessToken, setAccessToken] = useState(null);
 
//      const onLogin = () => {
//          auth0.webAuth
//              .authorize({
//                  scope: 'openid profile email'
//              })
//              .then(credentials => {
//                  Alert.alert('AccessToken: ' + credentials.accessToken);
//                  setAccessToken(credentials.accessToken);
//              })
//              .catch(error => console.log(error));
//      };
 
//      const onLogout = () => {
//          auth0.webAuth
//              .clearSession({})
//              .then(success => {
//                  Alert.alert('Logged out!');
//                  setAccessToken(null);
//              })
//              .catch(error => {
//                  console.log('Log out cancelled');
//              });
//      };
 
//      let loggedIn = accessToken !== null;
//      return (
//          <View style={styles.container}>
//              <Text style={styles.header}> Auth0Sample - Login </Text>
//              <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
//              <Button onPress={loggedIn ? onLogout : onLogin}
//                  title={loggedIn ? 'Log Out' : 'Log In'} />
//          </View >
//      );
//  }
 
//  const styles = StyleSheet.create({
//      container: {
//          flex: 1,
//          justifyContent: 'center',
//          alignItems: 'center',
//          backgroundColor: '#F5FCFF'
//      },
//      header: {
//          fontSize: 20,
//          textAlign: 'center',
//          margin: 10
//      }
//  });
 
//  export default App;
