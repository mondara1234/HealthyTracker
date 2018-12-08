import React from 'react';
import PropTypes from 'prop-types';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base';

const SideMenu = (props) => {
    return<Footer>
        <FooterTab >
            <Button
                style={styles.button}
                onPress={ props.diaryScreen }
            >
                <IconEntypo name="open-book" size={30} />
                <Text style={styles.Text}>{'ไดอารี่อาหาร'}</Text>
            </Button>
            <Button
                style={styles.button}
                onPress={ props.menuFoodScreen }
            >
                <IconMaterialCommunityIcons name="food" size={30} />
                <Text style={styles.Text}>{'เมนูอาหาร'}</Text>
            </Button>
            <Button
                style={styles.button}
                onPress={ props.bmiScreen }
            >
                <IconMaterialIcons name="healing" size={30} />
                <Text style={styles.Text}>{'BMI'}</Text>
            </Button>
            <Button
                style={styles.button}
                onPress={ props.trickScreen }
            >
                <IconMaterialCommunityIcons name="nutrition" size={30} />
                <Text style={styles.Text}>{'เคล็ดลับ'}</Text>
            </Button>
        </FooterTab>
    </Footer>
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#068E81',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#fff',
        paddingTop: 12
    },
    Text: {
        color: '#ffffff',
        fontSize: 10
    }
});

SideMenu.propTypes = {
    diaryScreen: PropTypes.func.isRequired,
    menuFoodScreen: PropTypes.func.isRequired,
    bmiScreen: PropTypes.func.isRequired,
    trickScreen: PropTypes.func.isRequired
};


export default SideMenu;
