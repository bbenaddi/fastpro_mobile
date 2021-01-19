import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartItem } from './extra/cart-item.component';
import { useSelector } from 'react-redux';

///////////////////////////////////////////////

export default ({ navigation }): React.ReactElement => {
const fetchAndTry = useSelector(state => state.fetch);

const styles = useStyleSheet(themedStyle);
const [products, setProducts] = React.useState([]);
const [test, setTest] = React.useState(false);

  React.useEffect(() => {
    
      fetchAndTry('chart',{})
      .then((result) => {
        for (let index = 0; index < result.length; index++) {
          result[index].index = index;
        }
        setProducts(result);
      })
      .catch((error) => {
        Alert.alert(
          "Erreur", "Votre panier est vide !", [{ text: 'Ressayer', onPress: () => {}, style: 'cancel' }], { cancelable: true }
        )
      });

      return ()=>{
      }
  },[]);
  /////////////////////////////////////////////////////////////

 
 
  const totalCost = (): number => {
    return products.reduce((acc: number, product): number => acc + product.prix, 0);
  };

  const onItemRemove = async (id_commande, index: number) => {

    fetchAndTry('retirer_panier', { id_commande: id_commande })
      .then((result) => {
        products.splice(index, 1);
        setProducts([...products]);
      })
      .catch((error) => {
        Alert.alert(
          "Erreur", "Ressayez s'il vous plait", [{ text: 'Ressayer', onPress: () => {}, style: 'cancel' }], { cancelable: true }
        )
      });

  };

  const onItemChange = (product, index: number): void => {
    products[index] = product;
    setProducts([...products]);
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category='h5'>Prix total:</Text>
      <Text category='h5'>{`${totalCost()} Dh`}</Text>
    </Layout>
  );

  const renderProductItem = (info): React.ReactElement => (
    <CartItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        data={products}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size='giant'>
        Payer
      </Button>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});

