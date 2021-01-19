import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/dashboards/trainings-1';
import { MenuIcon,SearchIcon } from '../../components/icons';

export const Trainings1Screen = ({ navigation }): React.ReactElement => {

  /*
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={onBackPress}
    />
  );
*/
const renderDrawerAction = (): React.ReactElement => (
  <TopNavigationAction
    icon={MenuIcon}
    onPress={navigation.toggleDrawer}
  />
);

const renderSearchAction = (): React.ReactElement => (
  <TopNavigationAction
    icon={SearchIcon}
    //onPress={onSearchActionPress}
  />
);
  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Fast Pro'
        leftControl={renderDrawerAction()}
      //  rightControls={[renderSearchAction()]}
      />
      <ContentView/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

