import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
class Logo extends Component {

    render(){
        return(
            <View style={styles.container}>
                <Image  style={{width: 150, height: 150}}
                        source={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIROGP.png'}}
                />
                <Text style={styles.logoText}>{this.props.Title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent:'center',
        alignItems: 'center'
    },
    logoText : {
        marginBottom: 15,
        marginTop: -25,
        fontSize: 18,
        color: '#068e81',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Logo;
