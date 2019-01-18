import React from 'react';
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from 'native-base';
import { withNavigation } from "react-navigation";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HandleBack from "../../common/components/HandleBack";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { MENUFOOD_SCREEN, FOODSTYPE_SCREEN } from "../../MenuFood/router";
import { FOODDIARY_SCREEN } from "../../FoodDiary/router";
import { BMI_SCREEN } from "../../BMI/router";
import { TRICK_SCREEN } from "../../Trick/router";
import Trans from "../../common/containers/Trans";

class FoodSearchScreen extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            editing: true
        }
    }

    onBack = () => {
        if (this.state.editing) {
            Alert.alert(
                Trans.tran('general.alert'),
                Trans.tran('general.close_App'),
                [
                    { text: Trans.tran('general.yes'), onPress: () => BackHandler.exitApp() },
                    { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" },
                ],
                { cancelable: false },
            );
            return true;
        }

        return false;

    };

    render() {

        const { navigate } = this.props.navigation;

        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.containerButton}
                            onPress={ () => navigate({routeName: MENUFOOD_SCREEN})}
                        >
                            <View style={styles.containerTextButton}>
                                <View style={styles.containerTitleButton}>
                                    <CommonText text={Trans.tran('MenuFood.foodSearch.search_by')} style={[styles.textButton,{marginLeft: 50}]} />
                                    <CommonText text={Trans.tran('MenuFood.foodSearch.food_name')} style={styles.textButton} />
                                </View>
                                <IconFontAwesome name="search" size={70} style={styles.styleIconFontAwesome} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.containerButton}
                            onPress={ () => navigate({routeName: FOODSTYPE_SCREEN})}
                        >
                            <View style={styles.containerTextButton}>
                                <View style={styles.containerTitleButton}>
                                    <CommonText text={Trans.tran('MenuFood.foodSearch.search_by')} style={[styles.textButton,{marginLeft: 50}]} />
                                    <CommonText text={Trans.tran('MenuFood.foodSearch.category')} style={styles.textButton} />
                                </View>
                                <IconMaterialIcons name="restaurant-menu" size={70} style={styles.styleIconFontAwesome} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <SideMenu
                        diaryScreen={() => this.props.navigation.navigate( FOODDIARY_SCREEN )}
                        menuFoodScreen={() => this.props.navigation.navigate( MENUFOOD_SCREEN )}
                        bmiScreen={() => this.props.navigation.navigate( BMI_SCREEN )}
                        trickScreen={() => this.props.navigation.navigate( TRICK_SCREEN )}
                    />
                </Container>
            </HandleBack>
        );
    }
}

FoodSearchScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={Trans.tran('MenuFood.foodSearch.title')} />,
    headerLeft: <HeaderLeftMenu icon={'arrow-back'} onPress={() => navigation.goBack()} />,
    headerRight: <HeaderLeftMenu icon={'home'} onPress={() => navigation.navigate(FOODDIARY_SCREEN)} />

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButton: {
        width: 300,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#068e81',
        marginTop: 30,
        paddingVertical: 20,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitleButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        color: '#068e81'
    },
    styleIconFontAwesome: {
        marginHorizontal: 20,
        color: '#000'
    },
});

export default withNavigation(FoodSearchScreen);
