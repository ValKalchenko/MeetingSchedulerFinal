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


const CreateAccountScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredpassword, setReenteredPassword] = useState('');
  const [type, setType] = useState('');
  const [securityTextEntry, setSecurityTextEntry] = useState(true);

  const typeNames = ['Project manager', 'Resource manager', 'Team member', 'Portfolio viewer', 'Administrator'];

  const navigation = useNavigation();

  const onSubmit = async () => {
    if (!username || !password || !reenteredpassword || !type) {
      Alert.alert('Invalid Input', 'To create a Scheduler account you must do the following:\nEnter a username\nEnter a password\nRe-enter your password\nSelect an account type');
      return;
    }
    schedulerDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${accountTableName} WHERE username = "${username}"`,
        [],
        (_, res) => {
          let account = res.rows.length;
          if (account >= 1){
            Alert.alert('Invalid User', 'Username already exists!');
            return;
          } else if (reenteredpassword != password){
              Alert.alert('Invalid Input', 'Password and re-entered password are not the same.');
              return;
            } else {
            let salt = bcrypt.genSaltSync(3);
            let hash = bcrypt.hashSync(password, salt);
            database.addAccount(username, hash, type);
            Alert.alert('User Created', 'User Created!');
            navigation.navigate('Sign In');
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
          <TextInput
            placeholder='Re-enter Password'
            placeholderTextColor='grey'
            value={reenteredpassword}
            autoCapitalize='none'
            onChangeText={setReenteredPassword}
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
          <Text style={styles.buttonText}>Create Your Account</Text>
        </Pressable>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <View style={{
            flexDirection: 'row', 
            marginTop: 20, 
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 16,
            }}>Already Have an Account? </Text>
            
          </View>
        </TouchableOpacity>  
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.buttonText}>Sign In Now</Text>
        </Pressable>
    </View>
  );
};

export default CreateAccountScreen;
