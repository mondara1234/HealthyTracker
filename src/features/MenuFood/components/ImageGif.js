import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import CommonText from '../../common/components/CommonText';

const ImageGif = (props) => {
    return(
        <View style={styles.containerGif}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
            <CommonText text={props.nameImg} color={'#068e81'} size={14} />
        </View>
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
        width: '23%',
        height: '23%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 60,
        height: 60,
        borderWidth:1,
        borderColor: '#068e81'
    }
});

export default ImageGif;