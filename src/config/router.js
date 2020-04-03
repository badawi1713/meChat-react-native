import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MapScreen from '../Screens/MapScreen';
import ContactScreen from '../Screens/ContactScreen';
import LoadingScreen from '../Screens/LoadingScreen';
import SetupProfile from '../Screens/SetupProfileScreen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import Firebase from './firebase';

const SetupProfileStack = createStackNavigator(
  {
    SetupProfile,
  },
  {
    initialRouteName: 'SetupProfile',
    headerMode: 'none',
  },
);

const RouterBottom = createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} name="map" size={30} />
        ),
        header: null,
      },
    },
    Contact: {
      screen: ContactScreen,
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

const App = createSwitchNavigator({
  SetupProfile: {
    screen: SetupProfileStack,
  },
  Loading: {
    screen: LoadingScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  RouterBottom: {
    screen: RouterBottom,
  },
});

export default createAppContainer(App);

// const AuthStack = createStackNavigator({
//   Login: LoginScreen,
//   Register: RegisterScreen,
// });

// AuthStack.navigationOptions = {
//   headerMode: 'none',
// };

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: LoadingScreen,
//       App: AppTabNavigator,
//       Auth: AuthStack,
//       Setup: SetupProfileStack,
//     },
//     {
//       initialRouteName: 'Loading',
//     },
//   ),
// );
