import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const MenuItem = (props) => {
    return(
        <TouchableOpacity style={styles.containerMenu} onPress={props.onPress}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
            <Text>{props.name}</Text>
        </TouchableOpacity>
    )
};

MenuItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    itemImage: PropTypes.number,
    name: PropTypes.string.isRequired
};

MenuItem.defaultProps = {
    itemImage: null
};

const styles = StyleSheet.create({
    containerMenu: {
        marginHorizontal: 15,
        paddingTop: 4,
        height: 90,
        width: 90,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#068e81'
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

export default MenuItem;