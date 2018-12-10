import React from 'react';
import PropTypes from 'prop-types';
import CommonText from './CommonText';
import {StyleSheet, View} from 'react-native';

const HeaderTitle = (props) => {
    return <View style={styles.container}>
            <CommonText text={'The Healthy Tracker'} color={'#fff'} size={20} style={styles.textTitle} />
           <CommonText text={props.text} color={props.color} size={props.size} />
    </View>
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        fontFamily: 'monotype-Corsiva'
    }
});

HeaderTitle.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
};

HeaderTitle.defaultProps = {
    text: '',
    color: '#fff',
    size : 18
};

export default HeaderTitle;
