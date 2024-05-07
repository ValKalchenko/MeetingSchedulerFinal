import React, { useState } from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import bcrypt from 'react-native-bcrypt';
import SelectDropdown from 'react-native-select-dropdown';

// use hook to create database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

const accountTableName = 'account';


const SignInScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [securityTextEntry, setSecurityTextEntry] = useState(true);

  const typeNames = ['Project manager', 'Resource manager', 'Team member', 'Portfolio viewer', 'Administrator'];

  const navigation = useNavigation();

  const onSubmit = async () => {
    if (!username || !password || !type) {
      Alert.alert('Invalid Input', 'To sign into Scheduler you must do the following:\nEnter your username and password\nSelect your account type');
      return;
    }
    schedulerDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${accountTableName} WHERE username = "${username}" AND type = "${type}"`,
        [],
        (_, res) => {
          let account = res.rows.length;
          if (account == 0){
            Alert.alert('Invalid Account', 'Username is invalid!');
            return;
          } else {
            let item = res.rows.item(0);
            let isPasswordCorrect = bcrypt.compareSync(password, item.password);
            if (type != item.type){
                Alert.alert('Invalid Account', 'Account type is invalid!');
                return;
            }
            if (!isPasswordCorrect){
              Alert.alert('Invalid Account', 'Password is invalid!');
              return;
            }

            if (user != 0 && isPasswordCorrect){
                Alert.alert('Valid Account', 'Welcome to Scheduler!');
              navigation.navigate('Start Scheduling!');
            }
          }
        },
        error => {
          console.log('Error getting account ' + error.message);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Scheduler
        </Text>
        <TextInput
            placeholder='Enter Username'
            placeholderTextColor='grey'
            value={username}
            autoCapitalize='none'
            onChangeText={setUsername}
            style={{
              color: 'black',
              fontSize: 16,
              width: '100%',
              marginVertical: 15,
              borderColor: 'lightgrey',
              borderBottomWidth: 1.0,
              paddingTop: 100,
            }}
          />
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor='grey'
            value={password}
            autoCapitalize='none'
            onChangeText={setPassword}
            secureTextEntry={securityTextEntry}
            style={{
              color: 'black',
              fontSize: 16,
              width: '100%',
              marginVertical: 15,
              borderColor: 'lightgrey',
              borderBottomWidth: 1.0,
            }}
          />
          <SelectDropdown
                data={typeNames}
                defaultValue={type}
                defaultButtonText={'Select Account Type'}
                onSelect={(selectedItem, index) => {
                    setType(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
            />
      </View>
      <Pressable
          style={styles.button}
          onPress={() => onSubmit()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <View style={{
            flexDirection: 'row', 
            marginTop: 20, 
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 16,
            }}>Don't Have an Account? </Text>
            
          </View>
        </TouchableOpacity>  
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Create One Now</Text>
        </Pressable>
    </View>
  );
};

export default SignInScreen;
