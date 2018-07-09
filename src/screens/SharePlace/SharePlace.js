import React, { Component } from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import ButtonWithBackground from '../../Components/UI/ButtonWithBackground/ButtonWithBackground';
import MainText from '../../Components/UI/MainText/MainText';
import HeadingText from '../../Components/UI/HeadingText/HeadingText';
import PickImage from '../../Components/PickImage/PickImage';
import PlaceInput from '../../Components/PlaceInput/PlaceInput';
import PickLocation from '../../Components/PickLocation/PickLocation';
import validate from '../../Utility/validation';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        controls: {
            placeInput: {
                value: null,
                valid: false,
                touched: false,
                validationRules: {
                    isEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    }
    
    placeNameChangedHandler = val => {
        this.setState( prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeInput: {
                        ...prevState.controls.placeInput,
                        value: val,
                        valid: validate(val, prevState.controls.placeInput.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'SideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true
                });
            }
        }
    }

    locationPickedHandler = (location) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeInput.value, 
            this.state.controls.location.value,
            this.state.controls.image.value
        );
    }

    imagePickedHandler = image => {
        this.setState( prevSate => {
            return {
                controls: {
                    ...prevSate.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    render() {
        let submitButton = (
            <ButtonWithBackground 
                color="#29aaf4" 
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeInput.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }>
                Share
            </ButtonWithBackground>
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }
        return (
            <ScrollView>
              <View style={styles.container}>
                <MainText>
                    <HeadingText>Share a place with us!</HeadingText>
                </MainText>
                <PickImage onImagePicked={this.imagePickedHandler} />
                <PickLocation onLocationPick={this.locationPickedHandler}/>
                <PlaceInput 
                  placeData={this.state.controls.placeInput} 
                  onChangeText={this.placeNameChangedHandler}
                />
                <View style={styles.button}>{submitButton}</View>
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150,
    },
    button: {
        margin: 8,
    },
    previewImage: {
        width: "100%",
        height: "100%",
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);