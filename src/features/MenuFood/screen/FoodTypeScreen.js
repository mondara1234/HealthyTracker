import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { Images } from "../../User/components/images";
import MenuItem from "../components/MenuItem";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { TRICK_SCREEN } from "../../Trick/router";
import { MENUFOOD_SCREEN } from "../router";
import { BMI_SCREEN } from "../../BMI/router";

class FoodTypeScreen extends React.PureComponent {

    render() {
        const item = 'ประเภทของอาหาร';
        return (
            <Container style={{ flex: 1}}>
                <Content>
                    <View style={styles.container}>
                        <View style={styles.menuContainer}>
                            <MenuItem
                                itemImage={Images.typeFood.food1}
                                name={'จานเดียว'}
                                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
                            />
                            <MenuItem
                                itemImage={Images.typeFood.food1}
                                name={'ผัก'}
                                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
                            />
                            <MenuItem
                                itemImage={Images.typeFood.food1}
                                name={'ผลไม้'}
                                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
                            />
                        </View>
                        <View style={styles.menuContainer}>
                            <MenuItem
                                itemImage={Images.typeFood.food4}
                                name={'ธัฐพืช'}
                                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
                            />
                            <MenuItem
                                itemImage={Images.typeFood.food4}
                                name={'เครื่องเคียง'}
                                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
                            />
                            <MenuItem
                                itemImage={Images.typeFood.food4}
                                name={'ของหวาน'}
                                onPress={() => this.props.navigation.navigate({routeName: MENUFOOD_SCREEN, params: {foodType: item}})}
                            />
                        </View>
                    </View>
                </Content>
                <SideMenu
                    diaryScreen={() => this.props.navigation.navigate( FOODDIARY_SCREEN )}
                    menuFoodScreen={() => this.props.navigation.navigate( MENUFOOD_SCREEN )}
                    bmiScreen={() => this.props.navigation.navigate( BMI_SCREEN )}
                    trickScreen={() => this.props.navigation.navigate( TRICK_SCREEN )}
                />
            </Container>
        );
    }
}

FoodTypeScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'หมวดหมู่อาหาร'} color={'#fff'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const windows = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: windows.width,
        height: '80%',
        paddingTop: 20
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }

});

export default FoodTypeScreen;
