import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { FloatingAction } from "react-native-floating-action";

interface SecurityProviderProps {
    navigation: NavigationScreenProp<any, any>,
}

const SecurityProvider = ({ navigation }: SecurityProviderProps) => {

    const registerAsset = () => {

    }

    const connectToBorrowers = () => {

    }

    return (
        <FloatingAction
            actions={[]}
            
            onPressItem={name => {
            console.log(`selected button: ${name}`);
            }}
        />
    );
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        color: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    registerAsset: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 30,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default SecurityProvider;
