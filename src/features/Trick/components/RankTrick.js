import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CommonText from '../../common/components/CommonText';

const RankTrick = (props) => {
    let nameimg = props.nameImg.toString();
    return(
        <View style={[styles.containerGif, props.style]}>
            <Image
                source={props.itemImage}
                style={styles.image}
            />
            <CommonText style={[styles.nameImage,{marginLeft: nameimg.length === 2 ? 8 : 12}]} text={props.nameImg} />
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