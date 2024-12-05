import axios from 'axios';
import React from 'react';
import { Pressable, ScrollView, Text, TextInput } from 'react-native';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { credentials, server } from './constants';

export default function CreateBlogScreen() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{ textAlign: 'center', fontSize: 20, margin: 20 }}>
          Write your Blog
        </Text>
        <Text style={{ marginLeft: 20, marginBottom: 10, marginTop: 20 }}>
          Blog title
        </Text>
        <TextInput
          placeholder="Give title to your blog"
          multiline={true}
          onChangeText={(text) => setTitle(text)}
          style={{
            width: '90%',
            margin: 'auto',
            fontSize: 25,
            borderStyle: 'solid',
            borderRadius: 30,
            padding: 15,
            borderWidth: 0.5,
            borderColor: '#000000',
          }}
        />

        <Text style={{ marginLeft: 20, marginBottom: 10, marginTop: 20 }}>
          Blog content (Body of blog)
        </Text>
        <TextInput
          placeholder="Write about your blog"
          multiline={true}
          onChangeText={(text) => setContent(text)}
          style={{
            width: '90%',
            margin: 'auto',
            height: 400,
            fontSize: 25,
            borderStyle: 'solid',
            borderRadius: 30,
            textAlignVertical: 'top',
            padding: 15,
            borderWidth: 0.5,
            borderColor: '#000000',
          }}
        />
        <Pressable
          onPress={() => {
            const uploadProcess = uploadBlog(title, content)
              .then((data) => console.log(data))
              .catch((err) => console.log(err));
          }}
          style={{
            backgroundColor: '#438c99',
            padding: 10,
            width: 150,
            borderRadius: 80,
            marginTop: 100,
            alignSelf: 'center',
          }}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff' }}>
            Upload Blog
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const uploadBlog = async (title, content) => {
  const data = {
    title: title,
    content: content,
    username: credentials.username,
    timestamp: new Date(),
    recipient: 'NA',
  };
  return await axios
    .post(server + 'createBlog', data, {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.rows.length < 1) {
        console.log('No response from server');
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      console.log('Error encountered: ' + err);
    });
};
