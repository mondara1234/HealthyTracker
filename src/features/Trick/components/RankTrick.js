import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const RankTrick = (props) => {
    return(
        <View style={[styles.containerGif, props.style]}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
            <Text style={styles.nameImage}>{props.nameImg}</Text>
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
        height: 30,
        marginRight: 10,
        marginBottom: 20
    },
    image: {
        width: 40,
        height: 40
    },
    nameImage: {
        fontSize: 14,
        color: '#fff',
        marginTop: -30,
        marginLeft: 16
    }
});

export default RankTrick;