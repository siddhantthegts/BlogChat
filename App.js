import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Blog from './Blog';
import BottomNavigation from './BottomNavigation';
import CreateBlogScreen from './CreateBlogScreen';
import Home from './Home';
import Login from './Login';
import SignUp from './Signup';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'signup',
  screens: {
    signup: {
      screen: SignUp,
      options: {
        headerShown: false,
      },
    },
    login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    createBlog: {
      screen: CreateBlogScreen,
      options: {
        headerShown: false,
      },
    },
    bottomTab: {
      screen: BottomNavigation,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  // axios.post(
  //   'http://localhost:3000/registerUser',
  //   QueryString.stringify({
  //     username: 'siddhant',
  //     password: 'singh@123',
  //   })
  // );
  return <Navigation />;
}
