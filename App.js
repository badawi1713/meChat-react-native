import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/Screens/LoginScreen';
import Register from './src/Screens/RegisterScreen';
import Home from './src/Screens/HomeScreen';

import Firebase from './src/config/firebase';

const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
