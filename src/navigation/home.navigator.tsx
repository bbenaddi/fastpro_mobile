import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemesNavigator } from './themes.navigator';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { EcommerceNavigator } from './ecommerce.navigator';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */

/*
 * Can we access it from `HomeNavigator`?
 */
const ROOT_ROUTES: string[] = [ 'Panier', 'Acceuil', 'Parametres'];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
  //const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: true };
};


const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={'Acceuil'}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name='Acceuil' component={EcommerceNavigator}/>
    <BottomTab.Screen name='Parametres' component={ThemesNavigator}/>
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}
    drawerContent={props => <HomeDrawer {...props}/>}
    >
    <Drawer.Screen name='VehiculeList' component={HomeTabsNavigator}/>
    <Drawer.Screen name='Home' component={HomeTabsNavigator}/>
    <Drawer.Screen name='Menu' component={HomeTabsNavigator}/>
  </Drawer.Navigator>
);
