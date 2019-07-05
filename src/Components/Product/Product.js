import React from 'react';
import { 
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { getTheme, MKSpinner } from 'react-native-material-kit';

import { 
  wishListButtonPressAction, 
  shoppingCartButtonPressAction,
} from './../../store/actions/index';

import ActionButton from './ActionButton';
import styles from './ProductStyles';

const theme = getTheme();

const Product = props => (
  <View style={[theme.cardStyle, styles.card]}>
    <Image source={{uri: props.image}} style={[theme.cardImageStyle, {resizeMode: 'contain'}]} />
    <Text style={theme.cardTitleStyle}>{props.name}</Text>
    <Text style={theme.cardContentStyle}>£{" "}{props.price}</Text>

    <View style={styles.actionButtonsContainer}>
      <ActionButton 
        handleActionButtonPress={() => props.handleWishListButtonPress(props.id)} 
        shouldFillIcon={props.isInWishList}
        filledIconName="bookmark"
        filledIconColor="blue"
        emptyIconName="bookmark-plus-outline"
      />

      <ActionButton 
        handleActionButtonPress={() => props.handleShoppingListButtonPress(props.id)} 
        shouldFillIcon={props.isInShoppingCart}
        filledIconName="cart"
        filledIconColor="green"
        emptyIconName="cart-plus"
      />
    </View>

    {props.isLoading && 
      (<View style={styles.spinnerContainer}>
        <MKSpinner />
      </View>)
    }
  </View>
)

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleWishListButtonPress: (id) => dispatch(wishListButtonPressAction(id)),
    handleShoppingListButtonPress: (id) => dispatch(shoppingCartButtonPressAction(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
