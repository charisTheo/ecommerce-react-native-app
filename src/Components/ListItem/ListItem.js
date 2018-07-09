import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const ListItem = (props) => {
    return (
      <TouchableOpacity onPress={props.onItemPressed}>
          <View style={styles.listItem}>
              <Image resizeMode="cover" source={props.placeImage} style={styles.placeImage}/>
              <Text>{props.placeName}</Text>
          </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        backgroundColor: "#eee",
        margin: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30,
    }
});

export default ListItem;