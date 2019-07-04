import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import ProductsList from '../../Components/ProductsList/ProductsList';

class MainScreen extends React.Component {

  render () {
    // show a list of products
    return (
      <ScrollView>
        <ProductsList 
          products={this.props.products.products}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    isLoading: state.ui.isLoading
  }
}

export default connect(mapStateToProps, null)(MainScreen);