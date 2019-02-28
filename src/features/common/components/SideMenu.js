import React from 'react';
import PropTypes from 'prop-types';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import Trans from "../containers/Trans";
import CommonText from '../../common/components/CommonText';

const SideMenu = (props) => {
    return<Footer>
        <FooterTab>
            <Button
                style={styles.button}
                onPress={ props.diaryScreen }
            >
                <IconEntypo name="open-book" size={30} />
                <CommonText text={Trans.tran('general.foodDiary')} style={styles.Text} />
            </Button>
            <Button
                style={styles.button}
                onPress={ props.menuFoodScreen }
            >
                <IconMaterialCommunityIcons name="food" size={30} />
                <CommonText text={Trans.tran('general.menu')} style={[styles.Text,{marginLeft: -3}]} />
            </Button>
            <Button
                style={styles.button}
                onPress={ props.bmiScreen }
            >
                <IconMaterialIcons name="healing" size={30} />
                <CommonText text={Trans.tran('general.BMI')} style={styles.Text} />
            </Button>
            <Button
                style={styles.button}
                onPress={ props.trickScreen }
            >
                <IconMaterialCommunityIcons name="nutrition" size={30} />
                <CommonText text={Trans.tran('general.trick')} style={styles.Text} />
            </Button>
        </FooterTab>
    </Footer>
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ddb911',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#991715',
        paddingTop: 12
    },
    Text: {
        color: '#0709a9',
        fontSize: 12
    }
});

SideMenu.propTypes = {
    diaryScreen: PropTypes.func.isRequired,
    menuFoodScreen: PropTypes.func.isRequired,
    bmiScreen: PropTypes.func.isRequired,
    trickScreen: PropTypes.func.isRequired
};


export default SideMenu;
