import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import RankTrick from '../../Trick/components/RankTrick';
import {Images} from "../../User/components/images";

const ImgRank = (props) => {
    return(
        <ImageBackground source={{uri: props.nameUriImg}} style={props.styleImg}>
            <View style={styles.containerImg}>
                <RankTrick  itemImage={Images.TrickScreen.Rank}
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