import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
// import {StyleSheet} from 'react-native';
import Profile from '../../Screens/ProfileScreen';
import Map from '../../Screens/MapScreen';
import Contact from '../../Screens/ContactScreen';
// import History from '../../Screens/History';
// import Profile from '../../Screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const ProfileWithBottomNavbar = props => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => <Icon name="map" size={35} color={'#3c3c3c'} />,
        }}
        name="Map"
        component={Map}
      />

      <Tab.Screen
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => (
            <Icon name="comments" size={35} color={'#3c3c3c'} />
          ),
        }}
        name="Contact"
        component={Contact}
      />

      <Tab.Screen
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => <Icon name="user" size={35} color={'#3c3c3c'} />,
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
export default ProfileWithBottomNavbar;
