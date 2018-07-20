import React, { Component } from 'react';
import { View, Button, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
  componentWillMount() {
      this.reset();
  }
  
  reset = () => {
      this.setState({
        focusedLocation: {
            latitude: 54.9767654,
            longitude: -1.609687,
            latitudeDelta: 0.0122,
            longitudeDelta: (
                Dimensions.get("window").width /
                Dimensions.get("window").height
              ) * 0.0122
        },
        locationChosen: false,
      });
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
        ...this.state.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude,
    });
    
    this.setState( prevState => {
        return {
            focusedLocation: {
                ...prevState.focusedLocation,
                latitude: coords.latitude,
                longitude: coords.longitude,
            },
            locationChosen: true,
        };
    });
    this.props.onLocationPick({
        latitude: coords.latitude,
        longitude: coords.longitude
    });
  }
  
  getLocationhandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordsEvent = {
          nativeEvent: {
              coordinate: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
              }
          }
      }
      this.pickLocationHandler(coordsEvent);
    }, (error) => {
      console.log(error);
      alert("Fetching position failed, please pick one manually!");
    });
  }

  render() {
      let marker = null;

      if (this.state.locationChosen) {
          marker = <MapView.Marker coordinate={this.state.focusedLocation} />
      }

      return (
          <View style={styles.container}>
            <MapView
              initialRegion={this.state.focusedLocation}
              region={!this.locationChosen ? this.state.focusedLocation : null}
              style={styles.map}
              onPress={this.pickLocationHandler}
              ref={ref => this.map = ref}
            >
              {marker}  
            </MapView>
            <View style={styles.button}>
                <Button title="Locate Me" onPress={this.getLocationhandler}/>
            </View>
          </View>
        );
  }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: 250,
    },
    button: {
        margin: 8,
    },
});

export default PickLocation;