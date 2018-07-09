import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput'; 

const placeInput = props => (
    <DefaultInput 
      placeholder="Place Name"
      onChangeText={props.onChangeText}
      value={props.placeData.value}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
    />
);

export default placeInput;
