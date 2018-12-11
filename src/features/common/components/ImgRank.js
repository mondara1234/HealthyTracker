import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import RankTrick from '../../Trick/components/RankTrick';
import {Images} from "../../User/components/images";

const ImgRank = (props) => {
    return(
        <View style={[props.styleContainer,styles.containerImg]}>
            <Image
                source={{uri: props.nameUriImg}}
                style={props.styleImg}
            />
            <RankTrick  itemImage={Images.TrickScreen.Rank}
                        nameImg={props.nameRank}
                        style={[props.styleImgRank,{ marginLeft: -30 }]}
            />
        </View>
    )
};

ImgRank.propTypes = {
    nameUriImg: PropTypes.number,
    styleImg: PropTypes.View,
    styleContainer: PropTypes.View,
    styleImgRank: PropTypes.View,
    nameRank: PropTypes.string
};

RankTrick.defaultProps = {
    nameUriImg: null,
    nameRank: '',
    style: {},
    styleContainer: {},
    styleImgRank: {}
};

const styles = StyleSheet.create({
    containerImg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ImgRank;