import React from 'react';
import { ImageBackground, StyleSheet, AsyncStorage,View,Image} from 'react-native';
import { Button, Card, List, Text,TopNavigationAction } from '@ui-kitten/components';
import { ActivityIcon, ClockIcon } from './extra/icons';
import { useSelector } from 'react-redux';
import {Alert} from 'react-native';
import {CreditCardOutlineIcon } from '../../../components/icons';



export default (): React.ReactElement => {
  const [vehicules, setVehicules] = React.useState([]);
  const fetchAndTry = useSelector(state => state.fetch);
  const site = useSelector(state => state.site);

 React.useEffect( () => {
  fetchAndTry('historique',{})
  .then((result) => {
    setVehicules(result);
  })
  .catch((error) => {
    Alert.alert(
      "Historique vide!","",[{text: 'Ressayer', onPress: () => {}, style: 'cancel'}],{cancelable: true}
    )
  });

},[]);


  const renderItemHeader = (info): React.ReactElement => (
    <View style={{flex:1}}>
    <Image
        style={styles.itemHeader}
        source={{uri : site+'vehicules/'+info.marque+'.png?time='+ new Date()}}
        resizeMode="contain"
      />
    </View>
    
    /*<ImageBackground
      style={styles.itemHeader}
      source={}
    />*/
  );

  /** 
   * 
   * 
  */
  const renderItem = (vehicule): React.ReactElement => {

    let info = vehicule.item ;

    return (
    
    <Card
    
      style={styles.item}
      header={() => renderItemHeader(info)}>
        
      <Text category='h4'>{info.marque} {info.modele} </Text> 

      <View style={styles.itemFooter}>
      
        <Button
          style={styles.activityButton}
          appearance='ghost'
          size='tiny'
          icon={ClockIcon}>
          {new Date(info.date).toISOString().replace('Z',' ').replace('T',' ').replace('.000','')}
        </Button>
        <Button
          style={styles.activityButton}
          appearance='ghost'
          size='tiny'
          status='danger'
          icon={CreditCardOutlineIcon}>
          {info.prix+" Dhs"}
        </Button>
      </View>
    </Card>
  );
    };
  return (
    <List
      style={styles.list}
      data={vehicules}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    borderRadius: 0,
    marginVertical: 8,
  },
  itemHeader: {
    height: 160,

  },
  itemFooter: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: -4,
  },
  activityButton: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
});
