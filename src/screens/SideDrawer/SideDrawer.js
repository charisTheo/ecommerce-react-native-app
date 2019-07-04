import React from 'react';
import { Platform, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MainText from '../../Components/MainText/MainText';

class SideDrawer extends React.Component {
    
    onButtonPress = (screen) => {
        // navigate to screen
        this.props.navigation.navigate(screen)
    }

    render() {
        return (
            <View style={[
                styles.container, 
                {width: Dimensions.get("window").width * 0.8}
                ]}>
              <TouchableOpacity onPress={() => this.onButtonPress('EcommerceApp.FavouritesScreen')}>
                <View style={styles.drawerItem}>
                  <Icon style={styles.drawerItemIcon} size={30} name={Platform.OS === "android" ? "md-heart" : "ios-heart"} color="red"></Icon>
                  <MainText>Favourites</MainText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onButtonPress('EcommerceApp.WishListScreen')}>
                <View style={styles.drawerItem}>
                  <Icon style={styles.drawerItemIcon} size={30} name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"} color="black"></Icon>
                  <MainText>Wish list</MainText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onButtonPress('EcommerceApp.ShoppingCartScreen')}>
                <View style={styles.drawerItem}>
                  <Icon style={styles.drawerItemIcon} size={30} name={Platform.OS === "android" ? "md-cart" : "ios-cart"} color="green"></Icon>
                  <MainText>Shopping cart</MainText>
                </View>
              </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee",
    },
    drawerItemIcon: {
        marginRight: 10,
    }
});

export default SideDrawer;