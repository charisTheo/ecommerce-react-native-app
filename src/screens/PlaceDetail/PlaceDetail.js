import React, { Component } from 'react';
import { 
    Text, 
    Platform, 
    Dimensions, 
    View, 
    ScrollView,
    Image, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape",
        })
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }
    
    render() {
        return (
            <ScrollView> 
              <View style={this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer}>
                <View style={this.state.viewMode === "landscape" ? styles.landscapeWrapper : {}}>
                  <View style={this.state.viewMode === "landscape" ? styles.landscapeImageWrapper : {}}> 
                      <Image source={this.props.selectedPlace.image} style={this.state.viewMode === "portrait" ? styles.portraitPlaceImage : styles.landscapePlaceImage}/>
                  </View>
                  <View style={this.state.viewMode === "landscape" ? styles.landscapeTitleDeleteWrapper : styles.portraitTitleDeleteWrapper}>
                      <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                      <TouchableOpacity onPress={this.placeDeletedHandler}>
                          <View style={styles.deleteButton}>
                              <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red"/>
                          </View>
                      </TouchableOpacity>
                  </View>
                </View>
                <MapView
                    style={this.state.viewMode === "landscape" ? styles.landscapeMap : styles.portraitMap}
                    initialRegion={{
                        ...this.props.selectedPlace.location, 
                        latitudeDelta: 0.0122,
                        longitudeDelta: (
                            Dimensions.get("window").width /
                            Dimensions.get("window").height
                          ) * 0.0122
                    }}>
                    <MapView.Marker coordinate={this.props.selectedPlace.location} />
                </MapView>
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    portraitContainer: {
        margin: 22,
    },
    portraitMap: {
        width: "100%",
        height: 250,
    },
    landscapeMap: {
        width: "100%",
        height: 250,
    },
    landscapeContainer: {
        margin: 15,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    landscapeImageWrapper: {
        flex: 3
    },
    landscapeTitleDeleteWrapper: {
        flex: 1
    },
    landscapeWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    portraitTitleDeleteWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPlaceImage: {
        width: "100%",
        height: 200,
    },
    landscapePlaceImage: {
        width: "100%",
        height: 200,
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
    },
    deleteButton: {
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);