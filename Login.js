import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import QueryString from 'qs';
import React from 'react';
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { credentials, server } from './constants';
export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [model, showModal] = React.useState(false);
  const [modeltext, setModaltext] = React.useState('');
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Welcome Back</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal} // For Android hardware back button handling
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}> {modeltext} </Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
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
          Login
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
            loginReq(username, password).then((data) => {
              if (data.token != undefined) {
                setModaltext('You are now logged in!');
                openModal();
                credentials.username = username;
                credentials.token = data.token;

                navigation.replace('bottomTab');
              } else {
                setModaltext('User is not registered with this username');
                openModal();
              }
            });
          }}
          color="#841584"
          style={{ alignSelf: 'center', marginTop: 30 }}
        >
          <Text
            style={{
              backgroundColor: '#841584',
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: '#ffffff',
              borderRadius: 5,
              fontSize: 15,
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>
      <Text
        onPress={() => {
          navigation.navigate('signup');
        }}
        style={{ color: 'blue' }}
      >
        New User? Sign Up
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background with transparency
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

const loginReq = async (user, pass) => {
  return await axios
    .post(server + 'login', {
      username: user,
      password: pass,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Couldn't contacted to server : " + err);
    });
};
