import React from 'react';
import { 
  View,
  Text,
  Image,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { getTheme, MKSpinner } from 'react-native-material-kit';

import { 
  wishListButtonPressAction, 
  shoppingCartButtonPressAction,
  clearStateAfterToastAction
} from './../../store/actions/index';

import ActionButton from './ActionButton';
import styles from './ProductStyles';

const theme = getTheme();

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  showToast = (updatedProduct, updatedListName) => {
    var isUpdatedProductAdded

    switch (updatedListName) {
      case 'wish list':
        isUpdatedProductAdded = updatedProduct.isInWishList;
        break;
        
      case 'shopping cart':
        isUpdatedProductAdded = updatedProduct.isInShoppingCart;
        break;

      default:
        break;
    }

    var toastMessage = isUpdatedProductAdded ? 
    `${updatedProduct.name} has been added to your ${updatedListName}!` : 
    `${updatedProduct.name} has been removed from your ${updatedListName}!`;
    ToastAndroid.show(toastMessage, ToastAndroid.SHORT);
    this.props.toastHasBeenShown()
  }
  componentWillUpdate() {
    if (this.props.updatedProduct && this.props.updatedListName) {
      this.showToast(this.props.updatedProduct, this.props.updatedListName);
    }
  }
  
  render() {
    return (
      <View style={[theme.cardStyle, styles.card]}>
        <Image source={{uri: this.props.image}} style={[theme.cardImageStyle, {resizeMode: 'contain'}]} />
        <Text style={theme.cardTitleStyle}>{this.props.name}</Text>
        <Text style={theme.cardContentStyle}>£{" "}{this.props.price}</Text>
  
        <View style={styles.actionButtonsContainer}>
          <ActionButton 
            handleActionButtonPress={() => this.props.handleWishListButtonPress(this.props.id)} 
            shouldFillIcon={this.props.isInWishList}
            filledIconName="bookmark"
            filledIconColor="blue"
            emptyIconName="bookmark-plus-outline"
          />
  
          <ActionButton 
            handleActionButtonPress={() => this.props.handleShoppingListButtonPress(this.props.id)} 
            shouldFillIcon={this.props.isInShoppingCart}
            filledIconName="cart"
            filledIconColor="green"
            emptyIconName="cart-plus"
          />
        </View>
  
        {this.props.isLoading && 
          (<View style={styles.spinnerContainer}>
            <MKSpinner />
          </View>)
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    updatedProduct: state.products.updatedProduct,
    updatedListName: state.products.updatedListName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleWishListButtonPress: (id) => dispatch(wishListButtonPressAction(id)),
    handleShoppingListButtonPress: (id) => dispatch(shoppingCartButtonPressAction(id)),
    toastHasBeenShown: () => dispatch(clearStateAfterToastAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
