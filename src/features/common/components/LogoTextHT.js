import React from 'react';
import PropTypes from 'prop-types';
import CommonText from './CommonText';
import { StyleSheet, View } from "react-native";

const LogoTextHT = (props) => {
    return <View style={styles.container}>
            <CommonText  text={'The'} color={props.colorMain} size={props.sizeMain} style={styles.styleThe} />
            <CommonText  text={'Healthy'} color={props.colorMain} size={props.sizeMain} style={styles.styleHealthy} />
            <CommonText  text={'Tracker'} color={props.color} size={props.size} style={styles.styleTracker} />
          </View>
};

const styles = StyleSheet.create({
    container :{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20
    },
    styleThe: {
        fontFamily: 'monotype-Corsiva'
    },
    styleHealthy: {
        marginTop: -13,
        paddingLeft: 12,
        fontFamily: 'monotype-Corsiva'
    },
    styleTracker: {
        marginTop: -10,
        paddingLeft: 24,
        fontFamily: 'monotype-Corsiva'
    },
});

LogoTextHT.propTypes = {
    colorMain: PropTypes.string,
    color: PropTypes.string,
    sizeMain: PropTypes.number,
    size: PropTypes.number
};

LogoTextHT.defaultProps = {
    colorMain: '#000',
    color: '#fff',
    sizeMain : 28,
    size : 22
};

export default LogoTextHT;
