import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  TextInput, 
  View,
} from 'react-native';
import { NavigationScreenProp } from "react-navigation";


interface RegisterAssetFormProps {
  navigation: NavigationScreenProp<any, any>;
};

const RegisterAssetForm = ({ navigation }: RegisterAssetFormProps) => {

  const [assetName, setAssetName] = useState('');
  const [assetQuantity, setAssetQuantity] = useState(0);
  const [assetValue, setAssetValue] = useState(0);

  const registerAsset = () => {

  }

  return (
    <View>
      <TextInput 
        style={styles.textInput}
        placeholderTextColor="#555"
        placeholder="Asset Name"
        value={assetName}
        onChangeText={name => setAssetName(name)}
      />
      <TextInput 
        style={styles.textInput}
        placeholderTextColor="#555"
        placeholder="Asset Quantity"
        value={assetName}
        onChangeText={name => setAssetName(name)}
      />
      <TextInput 
        style={styles.textInput}
        placeholderTextColor="#555"
        placeholder="Asset Value"
        value={assetName}
        onChangeText={name => setAssetName(name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
  }
});

export default RegisterAssetForm;

