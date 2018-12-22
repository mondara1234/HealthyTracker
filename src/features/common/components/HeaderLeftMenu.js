import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const HeaderLeftMenu = (props) => {
    return (
        <Button
            transparent
            light
            style={styles.button}
            onPress={props.onPress}
        >
            {props.icon === 'arrow-back' ?
                <IconMaterial
                    name={props.icon}
                    color={props.color}
                    size={props.size}
                    style={styles.icon}
                />
                : <Icon
                    name={props.icon}
                    color={props.color}
                    size={props.size}
                    style={styles.icon}
                />
            }
        </Button>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        paddingTop: 12
    }
});

HeaderLeftMenu.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
};

HeaderLeftMenu.defaultProps = {
    icon: 'navicon',
    color: '#fff',
    size: 25,
};

export default HeaderLeftMenu;
