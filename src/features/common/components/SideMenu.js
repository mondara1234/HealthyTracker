import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { NavigationActions } from "react-navigation";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { BMI_SCREEN } from "../../BMI/router";
import { MENUFOOD_SCREEN } from "../../MenuFood/router";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

class SideMenu extends Component {
    render() {
        return (
            <Container>
                <Content />
                <Footer>
                    <FooterTab>
                        <Button
                            style={styles.button}
                            onPress={() => NavigationActions.navigate({routeName: FOODDIARY_SCREEN})}
                            >
                            <Icon name="apps" />
                            <Text style={styles.Text}>{'ไดอารี่อาหาร'}</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={() => {
                                this.props.NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: MENUFOOD_SCREEN})
                                    ]
                                })
                            }}
                        >
                            <Icon name="camera" />
                            <Text style={styles.Text}>{'เมนูอาหาร'}</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={() => {
                                this.props.NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: BMI_SCREEN})
                                    ]
                                })
                            }}
                        >
                            <Icon active name="navigate" />
                            <Text style={styles.Text}>{'BMI'}</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={() => {
                                this.props.NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: TRICK_SCREEN})
                                    ]
                                })
                            }}
                        >
                            <Icon name="person" />
                            <Text style={styles.Text}>{'เคล็ดลับ'}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
    })
)(SideMenu);
