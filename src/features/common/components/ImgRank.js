import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, StyleSheet, View } from 'react-native';
import RankTrick from '../../Trick/components/RankTrick';

const ImgRank = (props) => {
    return(
        <ImageBackground source={{uri: props.nameUriImg}} style={props.styleImg}>
            <View style={styles.containerImg}>
                <RankTrick  itemImage={{uri: 'https://sv1.picz.in.th/images/2019/02/27/TIR8fn.png'}}
                            nameImg={props.nameRank}
                            style={props.styleImgRank}
                />
            </View>
        </ImageBackground>
    )
};

ImgRank.propTypes = {
    nameUriImg: PropTypes.number,
    styleImg: PropTypes.View,
    styleImgRank: PropTypes.View,
    nameRank: PropTypes.string
};

RankTrick.defaultProps = {
    nameUriImg: null,
    nameRank: '',
    style: {},
    styleImgRank: {}
};

const styles = StyleSheet.create({
    containerImg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 2,
        right: 0
    }
});

export default ImgRank;