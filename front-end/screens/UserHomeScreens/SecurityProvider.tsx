import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { FloatingAction } from "react-native-floating-action";

interface SecurityProviderProps {
    navigation: NavigationScreenProp<any, any>,
}

const SecurityProvider = ({ navigation }: SecurityProviderProps) => {
    console.log(navigation);


    const state = useSelector((state: any) => state.assets);
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, [dispatch]);

    return (
        <React.Fragment>
            <View>
            </View>
            <FloatingAction
                actions={[]}
                onPressMain={() => {
                    console.log("NAVIGATION: ", navigation);
                    // console.log("Main Pressed");
                    navigation.navigate("RegisterAssetForm");
                }}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                }}
            />
        </React.Fragment>
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
