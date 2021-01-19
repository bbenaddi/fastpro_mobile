import React, { useCallback } from 'react';
import { Dimensions, Image, Alert } from 'react-native';
import { Card, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { change } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

export const ProductListScreen = ({ navigation }): React.ReactElement => {

  const styles = useStyleSheet(themedStyles);
  const [vehicules, setVehicules] = React.useState([]);
  const site = useSelector(state => state.site);
  const fetchAndTry = useSelector(state => state.fetch);

  React.useEffect(() => {
    fetchAndTry('vehicules', {})
      .then((objets) => {
        for (let i = 0; i < objets.length; i++) {
          objets[i].index = i;
        }
        setVehicules(objets);
      })
      .catch((error) => {
        Alert.alert(
          "List vide!", "", [{ text: 'Ressayer', onPress: () => {}, style: 'cancel' }], { cancelable: true }
        )
      });
  }, []);

  const dispatch = useDispatch();
  const onItemPress = useCallback(
    marque => {
      dispatch(change(marque));
      navigation && navigation.navigate('ModeleList');
    },
    [dispatch]
  )

  const onItemCartPress = (index: number): void => {
    navigation && navigation.navigate('ShoppingCart', {
      itemId: index,
    });
  };
  /*
  const renderSearchAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={SearchIcon}
      onPress={onSearchActionPress}
    />
  );*/
  /*
    const renderItemFooter = (info): React.ReactElement => (
      <View style={styles.itemFooter}>
        <Button
          style={styles.iconButton}
          size='small'
         // icon={CartIcon}
          onPress={() => onItemPress(info.marque)}
        />
      </View>
    );
  */
  const renderItemHeader = (info): React.ReactElement => {
    return (
      <Image
        style={styles.itemHeader}
        source={{ uri: site + 'vehicules/' + info.marque.replace("/","_") + '.png?time=' + new Date() }}
        resizeMode="contain" />
    )
  };

  const renderItem = ({ item }) => (

    <Card
      style={[styles.productItem, (item.promotion != undefined) && { backgroundColor: '#F4FFF4' }]}
      header={() => renderItemHeader(item)}
      //footer={() => renderItemFooter(item)}
      onPress={() => onItemPress(item.marque)}>
      <Text category='s1'>
        {item.marque}
      </Text>
      <Text
        appearance='hint'
        category='c1'>
      </Text>
    </Card>

  );

  return (
    <List
      contentContainerStyle={styles.productList}
      style={styles.container}
      data={vehicules}
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
});
