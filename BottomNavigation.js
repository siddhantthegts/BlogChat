import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import Blog from './Blog';
import Home from './Home';
import Inbox from './Inbox';

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('createBlog');
        }}
        style={styles.fab}
        activeOpacity={0.7}
      >
        <Entypo
          name="plus"
          size={24}
          color="greeen"
          style={{ textAlign: 'center' }}
        />
      </TouchableOpacity>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Blog" component={Blog} />
        <Tab.Screen name="Inbox" component={Inbox} />
      </Tab.Navigator>
    </>
  );
}
const styles = {
  fab: {
    position: 'absolute',
    right: 10,
    width: 60,
    height: 60,
    bottom: 60,
    zIndex: 100,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
};
