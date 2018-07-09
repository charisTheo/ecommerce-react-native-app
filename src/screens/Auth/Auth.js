import React, { Component } from 'react';
import { 
    View, 
    Keyboard, 
    KeyboardAvoidingView, 
    Dimensions, 
    StyleSheet, 
    ImageBackground,
    TouchableWithoutFeedback,
    ActivityIndicator
  } from 'react-native';
import { connect } from 'react-redux';

import validate from '../../Utility/validation';
import DefaultInput from '../../Components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../Components/UI/HeadingText/HeadingText';
import MainText from '../../Components/UI/MainText/MainText';
import ButtonWithBackground from '../../Components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/lights.jpg';
import { tryAuth } from '../../store/actions/index';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
        
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: 'login',
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    }

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
        });
    }

    updateInputState = (key, value) => {
      let connectedValue = {};
      if (this.state.controls[key].validationRules.equalTo) {
        const equalControl = this.state.controls[key].validationRules.equalTo;
        const equalValue = this.state.controls[equalControl].value;
        connectedValue = {
            ...connectedValue,
            equalTo: equalValue
        }
      }
      if (key === "password") {
        connectedValue = {
            ...connectedValue,
            equalTo: value
        }; 
      }
      this.setState(prevState => {
        return {
            controls: {
                ...prevState.controls,
                confirmPassword: {
                    ...prevState.controls.confirmPassword,
                    valid: key === 'password' 
                        ? validate(
                            prevState.controls.confirmPassword.value, 
                            prevState.controls.confirmPassword.validationRules, 
                            connectedValue
                          ) 
                        : prevState.controls.confirmPassword.valid
                },
                [key] : {
                    ...prevState.controls[key],
                    value: value,
                    valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                    touched: true
                },
            }
        }
      })
    }

    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        let submitButton = (
            <ButtonWithBackground 
                color="#29aaf4" 
                onPress={this.authHandler}
                disabled={
                    !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' || 
                    !this.state.controls.password.valid ||
                    !this.state.controls.email.valid
                }
              >
                Submit
            </ButtonWithBackground>
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }
        if (this.state.viewMode === "portrait") {
            headingText = (
              <MainText>
                <HeadingText>Please {this.state.authMode === 'signup' ? 'Sign Up' : 'Login' }</HeadingText>
              </MainText>
            );
        } 
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
              <DefaultInput 
                style={styles.input} 
                placeholder="Confirm Password" 
                secureTextEntry
                value={this.state.controls.confirmPassword.value}
                onChangeText={(val) => {this.updateInputState("confirmPassword", val)}}  
                valid={this.state.controls.confirmPassword.valid}
                touched={this.state.controls.confirmPassword.touched}
              />
            );
        }
        
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                  {headingText}
                  <ButtonWithBackground 
                    color="#29aaf4"
                    onPress={this.switchAuthModeHandler}
                  >
                    Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login' }
                  </ButtonWithBackground>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.inputContainer}>
                      <DefaultInput 
                        placeholder="Your E-mail address" 
                        style={styles.input} 
                        value={this.state.controls.email.value}
                        onChangeText={(val) => {this.updateInputState("email", val)}} 
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        />
                      <View style={
                          this.state.viewMode === "portrait" || this.state.authMode === 'login'
                          ? styles.portraitPasswordContainer 
                          : styles.landscapePasswordContainer
                          }>
                        <View style={
                            this.state.viewMode === "portrait" || this.state.authMode === 'login'
                            ? styles.portraitPasswordWrapper 
                            : styles.landscapePasswordWrapper
                            }>
                          <DefaultInput 
                            style={styles.input} 
                            secureTextEntry
                            placeholder="Password" 
                            value={this.state.controls.password.value}
                            onChangeText={(val) => {this.updateInputState("password", val)}}
                            valid={this.state.controls.password.valid}
                            touched={this.state.controls.password.touched}
                          />
                        </View>
                        <View style={
                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordWrapper 
                            : styles.landscapePasswordWrapper
                            }>
                          {confirmPasswordControl}
                        </View>                          
                      </View>
                  </View>
                  </TouchableWithoutFeedback>
                  {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
    },
    inputContainer: {
        width: "70%",
    },
    input: {
        backgroundColor: "transparent",
        borderColor: "#bbb",
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);