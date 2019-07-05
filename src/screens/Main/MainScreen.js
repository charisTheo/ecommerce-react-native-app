import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductsList from '../../Components/ProductsList/ProductsList';

class MainScreen extends React.Component {
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