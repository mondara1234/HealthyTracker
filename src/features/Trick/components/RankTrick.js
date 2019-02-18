import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const RankTrick = (props) => {
    let nameimg = props.nameImg.toString();
    return(
        <View style={[styles.containerGif, props.style]}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
            <Text style={[styles.nameImage,{marginLeft: nameimg.length === 2 ? 8 : 12}]}>{props.nameImg}</Text>
        </View>
    )
};

RankTrick.propTypes = {
    itemImage: PropTypes.number,
    nameImg: PropTypes.string.isRequired,
    style: PropTypes.View
};

RankTrick.defaultProps = {
    itemImage: null,
    style: {}
};

const styles = StyleSheet.create({
    containerGif: {
        width: 30,
        height: 30
    },
    image: {
        width: 30,
        height: 30
    },
    nameImage: {
        fontSize: 10,
        color: '#fff',
        marginTop: -15
    }
});

export default RankTrick;