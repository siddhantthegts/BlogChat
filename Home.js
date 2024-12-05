import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { credentials, server } from './constants';

export default function Home() {
  const [blogs, setBlogs] = React.useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      return await axios
        .get(server + 'getBlogs', {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        })
        .then((res) => {
          setBlogs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBlogs();
  }, 60000);

  return (
    <ScrollView>
      <View>
        {blogs.map((item) => (
          <CardComponent
            title={item.title}
            author={item.username}
            content={item.content}
            date={item.timestamp}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function CardComponent({ title, content, author, date }) {
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 300 }}>{title}</Text>

      <Text style={{ fontSize: 15, fontWeight: 200, marginTop: 20 }}>
        {content}
      </Text>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'right',
          color: '#aaaaaa',
          fontWeight: 300,
        }}
      >
        {author}
      </Text>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'right',
          color: '#aaaaaa',
          fontWeight: 300,
        }}
      >
        {date}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable style={{ alignSelf: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#d9d9d9',
              width: 120,
            }}
          >
            Send
          </Text>
        </Pressable>
        <Pressable style={{ alignSelf: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'skyblue',
              width: 120,
            }}
          >
            Like
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
