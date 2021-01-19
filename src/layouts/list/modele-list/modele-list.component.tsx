import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Image, AsyncStorage, View, Alert } from 'react-native';
import { Button, Card, List, ListItem, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartIcon } from './extra/icons';
import { useSelector } from 'react-redux';

export const ProductListScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [modeles, setModeles] = useState([]);
  const marque = useSelector(state => state.marque);
  const site = useSelector(state => state.site);
  const fetchAndTry = useSelector(state => state.fetch);


  useEffect(() => {
    fetchAndTry('modeles', {marque: marque})
    .then((objets) => {
      setModeles(objets);
    })
    .catch((error) => {
      Alert.alert(
        "List vide!", "", [{ text: 'Ressayer', onPress: () => {}, style: 'cancel' }], { cancelable: true }
      )
    });
  }, []);


  const onItemPress = (index: number): void => {
    //navigation && navigation.navigate('ModeleList');
  };

  const onItemCartPress = async (index: number) => {
    fetchAndTry('ajouter_panier', {id_offre: index})
    .then((objets) => {
      navigation && navigation.navigate('ShoppingCart');
    })
    .catch((error) => {
      Alert.alert(
        "List vide!", "", [{ text: 'Ressayer', onPress: () => {}, style: 'cancel' }], { cancelable: true }
      )
    });
  }

  const renderItemFooter = (info) => (
    <View style={styles.itemFooter}>
      <Text>{info.description} </Text>
      <Button
        style={styles.iconButton}
        size='small'
        icon={CartIcon}
        onPress={() => onItemCartPress(info.id_offre)}
      />
    </View>
  );

  const renderItemHeader = (info) => (
    <Image
      style={styles.itemHeader}
      source={{ uri: site+'/vehicules/' + info.marque + '.png?time=' + new Date() }}
      resizeMode="contain" />
  );

  const renderItem = ({ item }) => (

    <Card
      header={() => renderItemHeader(item)}
      footer={() => renderItemFooter(item)}
      onPress={() => onItemPress(item.id_offre)}>
      <Text category='s1'>
        {item.marque} {item.modele}
      </Text>
      <Text
        style={styles.Text}
        appearance='hint'
        category='c1'> {item.prix} DHs
      </Text>
    </Card>

  );

  return (
    <List
      contentContainerStyle={styles.productList}
      style={styles.container}
      data={modeles}
      renderItem={renderItem}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  Text: {
    fontWeight: 'bold',
    color: 'red',
  }
});
