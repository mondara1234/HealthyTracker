import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const MenuItem = (props) => {
    return(
        <TouchableOpacity style={styles.containerMenu} onPress={props.onPress}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
        </TouchableOpacity>
    )
};

MenuItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    itemImage: PropTypes.number
};

MenuItem.defaultProps = {
    itemImage: null
};

const styles = StyleSheet.create({
    containerMenu: {
        paddingHorizontal: 30
    },
    image: {
        width: 80,
        height: 80,
        borderColor: '#fff',
        borderWidth: 3
    }

});

export default MenuItem;