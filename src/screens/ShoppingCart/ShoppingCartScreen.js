import React from 'react';
import { ScrollView } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductsList from '../../Components/ProductsList/ProductsList';
import styles from './ShoppingCartStyles'

const MaterialButton = MKButton.coloredButton()
.withText('Check out')
.withOnPress(() => {
  console.log("Check out button pressed!");
})
.build();

class ShoppingCartScreen extends React.Component {
  constructor (props) {
		super(props);

		this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent.bind(this));
	}

	async componentDidMount () {
		Icon.getImageSource('md-menu', 30).then((source) => {
			this.props.navigator.setButtons({
				leftButtons: [{
					id: 'menu',
					icon: source,
				}],
			});
    });
  }

	handleNavigatorEvent (e) {
    if (e.id === 'menu') {
      this.props.navigator.toggleDrawer();		
    }
  }

  render () {
    // filter only the products currently in the shopping cart
    let productsInShoppingCart = this.props.products.products.filter(
      product => product.isInShoppingCart
    );

    return (
      <>
        <ScrollView>
          <ProductsList 
            products={productsInShoppingCart}
          />
        </ScrollView>
        <MaterialButton style={styles.checkOutButton} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  }
}

export default connect(mapStateToProps, null)(ShoppingCartScreen);
