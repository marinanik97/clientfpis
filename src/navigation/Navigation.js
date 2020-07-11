import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {CreateType} from './pages/CreateType';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Type" component={CreateType} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
