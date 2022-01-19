import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const Borrower = () => {
    return (
        <View>
            <Text style={styles.text}>Borrower</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        color: "black",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default Borrower;
