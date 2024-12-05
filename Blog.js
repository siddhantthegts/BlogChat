import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { credentials, server } from './constants';

export default function Blog() {
  const [blogs, setBlogs] = React.useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      return await axios
        .get(server + `getBlogsByUser/${credentials.username}`, {
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
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: 22,
          textAlign: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: 10,
        }}
      >
        Your uploaded blogs
      </Text>
      {blogs.map((item) => (
        <CardComponent
          title={item.title}
          author={item.username}
          content={item.content}
          date={item.timestamp}
        />
      ))}
    </View>
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
    </View>
  );
}
