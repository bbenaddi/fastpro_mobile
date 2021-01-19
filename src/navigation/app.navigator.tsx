import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './home.navigator';
import { SignIn3Screen } from '../scenes/auth/sign-in-3.component';
import { createStackNavigator } from '@react-navigation/stack';
import { PaymentScreen } from '../scenes/ecommerce/payment.component';
import { ShoppingCartScreen } from '../scenes/ecommerce/shopping-cart.component';
import { ProductDetails3Screen } from '../scenes/ecommerce/product-details-3.component';
import { ForgotPasswordScreen } from '../scenes/auth/forgot-password.component';
import { ProfileSettings1Screen } from '../scenes/social/profile-settings-1.component';
import { VehiculeListScreen } from '../scenes/list/vehicule-list.component';
import { Trainings3Screen } from '../scenes/dashboards/trainings-3.component';
import { ModeleListScreen } from '../scenes/list/modele-list.component';
import { Trainings2Screen } from '../scenes/dashboards/trainings-2.component';
import { Trainings1Screen } from '../scenes/dashboards/trainings-1.component';

const Stack = createStackNavigator();

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};
export const AppNavigator = (): React.ReactElement => {
  return (
  <NavigationContainer theme={navigatorTheme}>
    <Stack.Navigator initialRouteName={'SignIn'} headerMode={"none"}>
        <Stack.Screen name="SignIn" component={SignIn3Screen} />
        <Stack.Screen name="Home" component={HomeNavigator}  />
        <Stack.Screen name='Payment' component={PaymentScreen}/>
        <Stack.Screen name='ShoppingCart' component={ShoppingCartScreen}/>
        <Stack.Screen name='ProductDetails' component={ProductDetails3Screen}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
        <Stack.Screen name='Vehicule_List' component={VehiculeListScreen}/>
        <Stack.Screen name='ModeleList' component={ModeleListScreen}/>
        <Stack.Screen name='ProduitList' component={ModeleListScreen}/>
        <Stack.Screen name='Profile' component={ProfileSettings1Screen}/>
        <Stack.Screen name='historique' component={Trainings3Screen}/>
        <Stack.Screen name='Owners_cars' component={Trainings2Screen}/>
        <Stack.Screen name='Menu' component={Trainings1Screen}/>  
    </Stack.Navigator>
  </NavigationContainer>
);
}
        