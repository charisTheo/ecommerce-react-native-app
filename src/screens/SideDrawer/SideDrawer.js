import React from 'react';
import { View, Dimensions } from 'react-native';

import MainText from '../../Components/MainText/MainText';
import ActionButton from '../../Components/Product/ActionButton';
import styles from "./SideDrawerStyles";

class SideDrawer extends React.Component {

  onButtonPress = (title, tabIndex) => {
    console.log(`SideDrawer.onButtonPress: navigating to ${title} screen`);
    this.props.navigator.switchToTab({ tabIndex });
    this.props.navigator.toggleDrawer();
  }

  render() {
    return (
      <View style={[
          styles.container, 
          {width: Dimensions.get("window").width * 0.8}
        ]}
      >
        <ActionButton 
          handleActionButtonPress={() => this.onButtonPress('Products', 0)} 
          style={styles.drawerItem}
          shouldFillIcon={true}
          filledIconName="basket"
        >
          <MainText style={styles.drawerItemText}>Products</MainText>
        </ActionButton>
      
        <ActionButton 
          handleActionButtonPress={() => this.onButtonPress('Wish list', 1)} 
          style={styles.drawerItem}
          shouldFillIcon={true}
          filledIconName="bookmark"
        >
          <MainText style={styles.drawerItemText}>Wish list</MainText>
        </ActionButton>
      
        <ActionButton 
          handleActionButtonPress={() => this.onButtonPress('Shopping cart', 2)} 
          style={styles.drawerItem}
          shouldFillIcon={true}
          filledIconName="cart"
        >
          <MainText style={styles.drawerItemText}>Shopping cart</MainText>
        </ActionButton>
      </View>
    );
  }
}

export default SideDrawer;
