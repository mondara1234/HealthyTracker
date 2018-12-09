import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const ImageGif = (props) => {
    return(
        <TouchableOpacity style={styles.containerGif}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
            <Text>{props.nameImg}</Text>
        </TouchableOpacity>
    )
};

ImageGif.propTypes = {
    itemImage: PropTypes.number,
    nameImg: PropTypes.string.isRequired
};

ImageGif.defaultProps = {
    itemImage: null
};

const styles = StyleSheet.create({
    containerGif: {
        width: 70,
        height: 90,
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 60,
        height: 60
    },
    nameImage: {
        fontSize: 16,
        color: '#068e81'
    }
});

export default ImageGif;