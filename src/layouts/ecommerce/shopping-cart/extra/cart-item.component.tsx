import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { useSelector } from 'react-redux';

export type CartItemProps = ListItemProps & {
  index: number;
  product;
  onProductChange: (product, index: number) => void;
  onRemove: (product, index: number) => void;
};

export const CartItem = (props: CartItemProps): React.ReactElement => {
  const site = useSelector(state => ( state.site))

  const { style, product, index, onProductChange, onRemove, ...listItemProps } = props;

  const onRemoveButtonPress = (id_commande): void => {
    onRemove(id_commande,index);
  };

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={{uri : site+'vehicules/'+product.marque+'.png?time='+ new Date()}}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text
          category='s1'>
          {product.produit_desc} {product.modele} {product.marque}
        </Text>
        <Text
          category='s1'>
          {product.prix} Dh
        </Text>
        
        <Text category='s2'>
          {""}
        </Text>
        <View style={styles.amountContainer}>
        <Text 
          style={{ color: 'red'}}
          appearance='hint'
          category='s2'>
          {product.label} 
        </Text>
          <Text
            style={styles.amount}
            category='s2'>
            {""}
          </Text>
          
        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance='ghost'
        status='basic'
        icon={CloseIcon}
        onPress={()=> onRemoveButtonPress(product.id_commande)}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: 'center',
    width: 40,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
