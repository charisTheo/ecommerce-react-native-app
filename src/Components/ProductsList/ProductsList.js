import React from 'react';
import { FlatList } from 'react-native';
import Product from '../Product/Product';

import styles from './ProductListStyles'

const ProductsList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.products}
      scrollEnabled={true}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <Product
          id={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          isFavourite={item.isFavourite}
          isInWishList={item.isInWishList}
          isInShoppingCart={item.isInShoppingCart}
        />
      )}
    />
  );  
};

export default ProductsList;
