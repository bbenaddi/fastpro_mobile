import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Trainings1Screen } from '../scenes/dashboards/trainings-1.component';
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const EcommerceNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' initialRouteName='Menu'>
    <Stack.Screen name='Menu' component={Trainings1Screen}/>
  </Stack.Navigator>
);
