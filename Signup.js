import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import QueryString from 'qs';
import React from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { server } from './constants';

export default function SignUp() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Blog Chat</Text>
      <View
        style={{
          backgroundColor: '#eeeeee',
          borderRadius: '10%',
          padding: 20,
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: 300,
        }}
      >
        <Text style={{ color: '#000000', fontSize: 30, fontWeight: 700 }}>
          Sign up{' '}
        </Text>
        <View style={{ width: '100%' }}>
          <TextInput
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 10,
              width: '100%',
              marginBottom: 20,
            }}
            onChangeText={setUsername}
            placeholder="Enter username"
          />
          <TextInput
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 10,
              width: '100%',
            }}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder="Enter password"
          />
        </View>
        <Pressable
          onPress={() => {
            signupReq(username, password, navigation);
          }}
          color="#841584"
          style={{ alignSelf: 'center', marginTop: 30 }}
        >
          <Text
            style={{
              backgroundColor: '#841584',
              padding: 10,
              color: '#ffffff',
              borderRadius: 5,
            }}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
      <Text
        onPress={() => {
          navigation.navigate('login');
        }}
        style={{ color: 'blue' }}
      >
        Existing User? Log in Here
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const signupReq = async (user, pass, navigation) => {
  await axios
    .post(server + 'registerUser', {
      username: user,
      password: pass,
    })
    .then((res) => {
      if (res.status == 200) {
        navigation.navigate('bottomTab');
      }
    })
    .catch((err) => {
      console.log("Couldn't contacted to server : " + err);
    });
};
