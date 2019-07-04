import React from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getTheme, MKSpinner } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { 
  favouriteButtonPressAction, 
  wishListButtonPressAction, 
  shoppingCartButtonPressAction,
} from './../../store/actions/index'

const theme = getTheme();

const Product = props => (
  <View style={[theme.cardStyle, styles.card]}>
    <Image source={{uri: props.image}} style={[theme.cardImageStyle, {resizeMode: 'contain'}]} />
    <Text style={theme.cardTitleStyle}>{props.name}</Text>
    <Text style={theme.cardContentStyle}>{props.price}</Text>

    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity onPress={() => props.handleFavouriteButtonPress(props.id)}>
        {props.isFavourite ? 
          <MCIcon style={styles.actionButton} size={30} name={"heart"} color="red" /> : 
          <MCIcon style={styles.actionButton} size={30} name={"heart-outline"} color="black" />
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.handleWishListButtonPress(props.id)}>
        {props.isInWishList ? 
          <Icon style={styles.actionButton} size={30} name={"bookmark"} color="blue" /> :
          <Icon style={styles.actionButton} size={30} name={"bookmark-border"} color="black" />
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.handleShoppingListButtonPress(props.id)}>
        {props.isInShoppingCart ? 
          <Icon style={styles.actionButton} size={30} name={"shopping-cart"} color="green" /> :
          <Icon style={styles.actionButton} size={30} name={"add-shopping-cart"} color="black" />          
        }
      </TouchableOpacity>
    </View>

    {props.isLoading && 
      (<View style={styles.spinnerContainer}>
        <MKSpinner />
      </View>)
    }
  </View>
)

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 350,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 10},
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 4,
    marginVertical: 20,
  },
  actionButtonsContainer: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingTop: 20
  },
  actionButton: {
    marginRight: 20,
    marginLeft: 20,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.6,
    zIndex: 10
  }
})

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFavouriteButtonPress: (id) => dispatch(favouriteButtonPressAction(id)),
    handleWishListButtonPress: (id) => dispatch(wishListButtonPressAction(id)),
    handleShoppingListButtonPress: (id) => dispatch(shoppingCartButtonPressAction(id)),
    startLoading: () => dispatch(uiStartLoading()),
    stopLoading: () => dispatch(uiStopLoading()),
    // showToast: (message) => dispatch(showToast(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
