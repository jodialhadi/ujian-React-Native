import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
export default function Header(){
    return(
 <View style={styles.header}>
 <Text style={styles.title}>Menu Restoran Ilegal</Text>
 </View>
    )
}
const styles = StyleSheet.create({
header: {
    height: 80,
    paddingTop: 30,
    backgroundColor: '#696969'
},
title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
}
});