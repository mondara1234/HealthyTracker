import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from 'native-base';
import { withNavigation } from "react-navigation";
import SideMenu from '../../common/components/SideMenu';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import { MENUFOOD_SCREEN, FOODSTYPE_SCREEN } from "../../MenuFood/router";

class FoodSearchScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <Container>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.containerButton}
                        onPress={ () => navigate({routeName: MENUFOOD_SCREEN})}
                    >
                        <View style={styles.containerTextButton}>
                            <View style={styles.containerTitleButton}>
                                <Text style={[styles.textButton,{marginLeft: 50}]}> {'ค้นหาตาม'} </Text>
                                <Text style={styles.textButton}> {'ชื่ออาหาร'} </Text>
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
                                <Text style={[styles.textButton,{marginLeft: 50}]}> {'ค้นหาตาม'} </Text>
                                <Text style={styles.textButton}> {'หมวดหมู่'} </Text>
                            </View>
                            <IconMaterialIcons name="restaurant-menu" size={70} style={styles.styleIconFontAwesome} />
                        </View>
                    </TouchableOpacity>
                </View>
                <SideMenu/>
            </Container>
        );
    }
}

FoodSearchScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'ค้นหาอาหาร'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const styles = StyleSheet.create({
    container: {
        paddingTop: '50%',
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
