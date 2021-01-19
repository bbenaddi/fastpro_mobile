import React from 'react';
import { StyleSheet,ImageBackground  } from 'react-native';
import { List, Text,Card,Button } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ClockIcon } from './extra/icons';
import { useSelector } from 'react-redux';


export const TrainingsListScreen = ({ route }): React.ReactElement => {
  const site = useSelector(state => ( state.site))
  const verticalItems = [
  {
    image : 'ads/promotions.jpg'
  },
  {
    image : 'ads/vidange.jpg'
  },
  ];
  const horizontalItems = [
  {
    image : 'ads/1.png'
  },
  {
    image : 'ads/2.png'
  },
  {
    image : 'ads/3.png'
  },
  {
    image : 'ads/4.png'
  }
  ];
 // const link = "http://192.168.1.113:3001/ads/1.png"


  const renderHeader = (): React.ReactElement => (
    <React.Fragment>
      <List
        contentContainerStyle={styles.horizontalList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={horizontalItems}
        renderItem={renderHorizontalTrainingItem}
      />
    </React.Fragment>
  );
  const renderHorizontalTrainingItem = (info): React.ReactElement => {
  return (
    <Card
      style={[styles.container, styles.horizontalItem]}>
      <ImageBackground 
        style={styles.image}
        source={{uri : site+info.item.image}}>
        <Text
          style={styles.level}
          category='s1'
          status='control'>
          {''}
        </Text>
        <Text
          style={styles.title}
          category='h2'
          status='control'>
          {''}
        </Text>
        <Button
          style={styles.durationButton}
          size='tiny'
          icon={ClockIcon}>
          {'New'}
        </Button>
      </ImageBackground >
    </Card>
  );
}

  const renderVerticalTrainingItem = (info): React.ReactElement => (
    <Card
      style={[styles.container, styles.verticalItem]}>
      <ImageOverlay
        style={styles.image}
        source={{uri : site+info.item.image}}>
        <Text
          style={styles.level}
          category='s1'
          status='control'>
          {''}
        </Text>
        <Text
          style={styles.title}
          category='h2'
          status='control'>
          {''}
        </Text>
        <Button
          style={styles.durationButton}
          size='tiny'
          icon={ClockIcon}>
          {'New'}
        </Button>
      </ImageOverlay>
    </Card>
  );

  return (
    <List
      contentContainerStyle={styles.list}
      data={verticalItems}
      renderItem={renderVerticalTrainingItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 24,
  },
  headerTitle: {
    marginHorizontal: 16,
  },
  horizontalList: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  verticalItem: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  horizontalItem: {
    width: 256,
    marginHorizontal: 8,
  },
container: {
  height: 200,
},
image: {
  ...StyleSheet.absoluteFillObject,
  height: 200,
  paddingVertical: 24,
  paddingHorizontal: 16,
  width: 500,
  resizeMode: 'contain',
  flexShrink:1
  
},
level: {
  zIndex: 1,
},
title: {
  zIndex: 1,
},
durationButton: {
  position: 'absolute',
  left: 16,
  bottom: 16,
  borderRadius: 16,
  paddingHorizontal: 0,
}},);
