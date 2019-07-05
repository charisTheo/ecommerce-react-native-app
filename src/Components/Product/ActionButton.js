import React from 'react';
import { TouchableOpacity, View } from "react-native";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionButton = props => {
  return (
    <TouchableOpacity onPress={props.handleActionButtonPress}>
        <View style={props.style}>
          {props.shouldFillIcon ? 
            <MCIcon size={props.iconSize} name={props.filledIconName} color={props.filledIconColor} /> : 
            <MCIcon size={props.iconSize} name={props.emptyIconName} color="black" />
          }
          {props.children}
        </View>
      </TouchableOpacity>
  )
}

ActionButton.defaultProps = {
  style: {
    marginHorizontal: 20
  },
  iconSize: 30,
  filledIconColor: '#76ff03'
}

export default ActionButton;
