import React from 'react';
import { Text } from 'react-native';

import styles from './MainTextStyles'

const mainText = props => (
    <Text {...props} style={[styles.mainText, props.style]}>{props.children}</Text>
);

export default mainText;