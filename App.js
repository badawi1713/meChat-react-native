import React from 'react';

import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import MapScreen from './src/Screens/MapScreen';
import ContactScreen from './src/Screens/ContactScreen';
import LoadingScreen from './src/Screens/LoadingScreen';
import SetupProfileScreen from './src/Screens/SetupProfileScreen';
import FriendProfileScreen from './src/Screens/FriendProfileScreen';
import ChatScreen from './src/Screens/ChatScreen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import Firebase from './src/config/firebase';

// const SetupProfileStack = createStackNavigator(
//   {
//     SetupProfile,
//   },
//   {
//     initialRouteName: 'SetupProfile',
//     headerMode: 'none',
//   },
// );

const ContactStack = createStackNavigator(
  {
    Chat: {
      screen: ChatScreen,
    },
    ChatList: {
      screen: ContactScreen,
    },
  },
  {
    initialRouteName: 'ChatList',
    headerMode: 'none',
  },
);

const MapStack = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
    },
    FriendProfile: {
      screen: FriendProfileScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    initialRouteName: 'Map',
    headerMode: 'none',
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} name="map" size={30} />
        ),
        header: null,
      },
    },
    Contact: {
      screen: ContactStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} name="comments" size={30} />
        ),
        header: null,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} name="user" size={30} />
        ),
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Profile',
    tabBarOptions: {
      activeTintColor: '#262626',
      inactiveTintColor: '#b2b2b2',
      showLabel: false,
      inactiveBackgroundColor: '#fff',
      activeBackgroundColor: '#FFD700',
    },
  },
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

const SetupProfileStack = createStackNavigator({
  SetupProfile: SetupProfileScreen,
});

AuthStack.navigationOptions = {
  headerMode: 'none',
};

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
      Setup: SetupProfileStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
