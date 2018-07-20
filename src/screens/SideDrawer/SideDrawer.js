import React, { Component } from 'react';
import { Platform, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MainText from '../../Components/UI/MainText/MainText';
import { authLogout } from '../../store/actions/index';


class SideDrawer extends Component {
    render() {
        return (
            <View style={[
                styles.container, 
                {width: Dimensions.get("window").width * 0.8}
                ]}>
              <TouchableOpacity onPress={this.props.onLogout}>
                <View style={styles.drawerItem}>
                  <Icon style={styles.drawerItemIcon} size={30} name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} color="black"></Icon>
                  <MainText>Sign Out</MainText>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);