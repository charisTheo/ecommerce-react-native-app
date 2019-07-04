import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Product from '../Product/Product';


const ProductsList = props => {
  // console.log("TCL: props", props)
  return (
    <FlatList
      style={styles.listContainer}
      data={props.products}
      scrollEnabled={true}
      contentContainerStyle={{alignItems: 'center'}}
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

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginVertical: 20,
  },
});

export default ProductsList;
