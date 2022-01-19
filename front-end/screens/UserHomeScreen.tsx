import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useSelector } from "react-redux";
import { ReduxState } from "../store";
import Borrower from "./UserHomeScreens/Borrower";
import Lender from "./UserHomeScreens/Lender";
import SecurityProvider from "./UserHomeScreens/SecurityProvider";

interface UserHomeScreenProps {
    navigation: NavigationScreenProp<any, any>;
};

const UserHomeScreen = ({ navigation }: UserHomeScreenProps) => {
    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate("Login");
        }
    }, [])

    return (
        <View style={styles.container}>
            {userInfo && userInfo.accountType === "Borrower" && <Borrower/>}
            {userInfo && userInfo.accountType === "Lender" && <Lender/>}
            {userInfo && userInfo.accountType === "Security Provider" && <SecurityProvider/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,  
        color: "#000000",
    },
});

export default UserHomeScreen;
