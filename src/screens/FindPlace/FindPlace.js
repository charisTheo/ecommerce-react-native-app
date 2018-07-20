import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../Components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        showAnim: new Animated.Value(0),
    }

    onNavigatorEvent = event => {
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onLoadPlaces();                
            }
        }
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'SideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true
                });
            }
        }
    }
    
    itemSelectedHandler = (key) => {
        const selPlace = this.props.places.find(place => place.key === key);
        this.props.navigator.push({
            screen: 'ExampleApp.PlaceDetailScreen',
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }

    placesLoadedHandler = () => {
        //starts the animation to show the list
        Animated.timing(this.state.showAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    render() {
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ]
            }}>
              <TouchableOpacity onPress={this.placesSearchHandler}>
                <View style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>Find Places</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.showAnim,
                    transform: [
                        {
                            scale: this.state.showAnim
                        }
                    ]
                }}>
                  <PlaceList 
                    onItemSelected={this.itemSelectedHandler} 
                    places={this.props.places}
                  />
                </Animated.View>
            );
        }
        return (<View style={this.state.placesLoaded ? null : styles.buttonContainerStyle}>{content}</View>);
    }
}

const styles = StyleSheet.create({
    buttonContainerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize : 26,
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);