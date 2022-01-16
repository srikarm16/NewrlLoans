import React from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface UserHomeScreenProps {
    navigation: NavigationScreenProp<any, any>;
};

const UserHomeScreen = ({}: UserHomeScreenProps) => {
    return (
        <View>
            <Text>UserHomeScreen</Text>
        </View>
    );
}

export default UserHomeScreen;
