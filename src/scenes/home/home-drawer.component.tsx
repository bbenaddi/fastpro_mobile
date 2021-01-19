import React from 'react';
import { StyleSheet, View,AsyncStorage } from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerElement,
  DrawerHeaderElement,
  DrawerHeaderFooter,
  DrawerHeaderFooterElement,
  Layout,
  MenuItemType,
  Text,
} from '@ui-kitten/components';
import { BookIcon, GithubIcon,PowerOutlineIcon,ShoppinCartIcon,BulbOutIcon,CarOutLineIcon,PeopleOutLineIcon,BellOutLineIcon,ArchiveOutLineIcon,VolumeUpOutLineIcone } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { WebBrowserService } from '../../services/web-browser.service';
import { AppInfoService } from '../../services/app-info.service';

const DATA: MenuItemType[] = [
  { title: 'Promotions  (pas encore)', icon: VolumeUpOutLineIcone },
  { title: 'Offres ', icon: BulbOutIcon },
  { title: 'Vehicules', icon: CarOutLineIcon },
  { title: 'Historique ', icon: ArchiveOutLineIcon },
  { title: 'Notifications  (pas encore)', icon: BellOutLineIcon },
  { title: 'Profile', icon: PeopleOutLineIcon },
  { title: 'Panier', icon: ShoppinCartIcon },
  { title: 'SE DECONNECTER', icon: PowerOutlineIcon },
];

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({ navigation }): DrawerElement => {

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        //navigation.navigate('Promotions');
        return;
      }
      case 1: {
        navigation.toggleDrawer();
        navigation.navigate('Vehicule_List');
        return;
      }
      case 2: {
        navigation.toggleDrawer();
        navigation.navigate('Owners_cars');
        return;
      }
      case 3: {
        navigation.toggleDrawer();
        navigation.navigate('historique');
        return;
      }
      case 4: {
        navigation.toggleDrawer();
        //navigation.navigate('Notifications');
        return;
      }
      case 5: {
        navigation.toggleDrawer();
        navigation.navigate('Profile');
        return;
      }
      case 6: {
        navigation.toggleDrawer();
        navigation.navigate('ShoppingCart');
        return;
      }
      case 7: {
        AsyncStorage.removeItem('token_id');
        navigation.toggleDrawer();
        navigation.navigate('SignIn');
        return;
      }
    }
  };

  const renderHeader = (): DrawerHeaderElement => (
    <Layout
      style={styles.header}
      level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={require('../../assets/images/image-app-icon.png')}
        />
        <Text
          style={styles.profileName}
          category='h6'>
          Menu
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Divider/>
      <DrawerHeaderFooter
        disabled={true}
        description={`Version ${AppInfoService.getVersion()}`}
      />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <Drawer
        header={renderHeader}
        footer={renderFooter}
        data={DATA}
        onSelect={onItemSelect}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
