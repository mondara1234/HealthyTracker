import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderLeftMenu = (props) => {
    return (
        <Button
            transparent
            light
            style={styles.button}
            onPress={props.onPress}
        >
            <Icon name={props.icon} style={[styles.icon,{fontSize: props.icon === 'home' ? 25 : 20}]} />
        </Button>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        width: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#fff',
        paddingTop: 12
    }
});

HeaderLeftMenu.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string
};

HeaderLeftMenu.defaultProps = {
    icon: 'navicon',
};

export default HeaderLeftMenu;
