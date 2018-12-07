import React, { Component } from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { Container, Footer, Content, FooterTab, Button, Text } from 'native-base';
import { withNavigation } from "react-navigation";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { BMI_SCREEN } from "../../BMI/router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";

class SideMenu extends Component {
    render() {

        const { navigate } = this.props.navigation;

        return (
            <Container style={styles.container}>
                <Content />
                <Footer>
                    <FooterTab>
                        <Button
                            style={styles.button}
                            onPress={ () => navigate({routeName: FOODDIARY_SCREEN})}
                            >
                            <IconEntypo name="open-book" size={30} />
                            <Text style={styles.Text}>{'ไดอารี่อาหาร'}</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={ () => navigate({routeName: MENUFOOD_SCREEN})}
                        >
                            <IconMaterialCommunityIcons name="food" size={30} />
                            <Text style={styles.Text}>{'เมนูอาหาร'}</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={ () => navigate({routeName: BMI_SCREEN})}
                        >
                            <IconMaterialIcons name="healing" size={30} />
                            <Text style={styles.Text}>{'BMI'}</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={ () => navigate({routeName: TRICK_SCREEN})}
                        >
                            <IconMaterialCommunityIcons name="nutrition" size={30} />
                            <Text style={styles.Text}>{'เคล็ดลับ'}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '20%'
    },
    button: {
        backgroundColor: '#068E81',
        display: 'flex',
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

export default withNavigation(SideMenu);
