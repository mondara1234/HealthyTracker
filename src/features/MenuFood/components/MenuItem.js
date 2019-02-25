import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import CommonText from '../../common/components/CommonText';

const MenuItem = (props) => {
    return(
        <TouchableOpacity style={styles.containerMenu} onPress={props.onPress}>
            <Image
                source={{uri:props.itemImage}}
                style={styles.image}
            />
            <CommonText text={props.name} style={styles.nameImage} />
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
        marginHorizontal: '2%',
        paddingTop: 4,
        height: 100,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#068e81',
        marginBottom: 20
    },
    image: {
        width: '90%',
        height: 60,
        borderWidth: 1,
        borderColor: '#068e81'
    },
    nameImage: {
        color: '#068e81',
        marginTop: 2
    }

});

export default MenuItem;