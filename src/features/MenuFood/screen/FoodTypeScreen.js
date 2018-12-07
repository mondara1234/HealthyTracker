import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container } from 'native-base';
import MenuItem from "../components/MenuItem";
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class FoodTypeScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.menuContainer}>
                        <MenuItem
                            itemImage={require('../../../../pulic/assets/images/Boruto.jpg')}
                        />{/*ค้นหาด้วยการกรอกชื่ออาหาร*/}
                        <MenuItem
                            itemImage={require('../../../../pulic/assets/images/photo.png')}
                        />{/*สแกนอาหารแล้วบอก calorie เป็นข้อความพร้อมเสียง*/}
                    </View>
                    <View style={styles.menuContainer}>
                        <MenuItem
                            itemImage={require('../../../../pulic/assets/images/Scanner.png')}
                        />{/*แสดงรายการคำนวณ BMR TEDD*/}
                        <MenuItem
                            itemImage={require('../../../../pulic/assets/images/Search.png')}
                        />{/*ประวัติการใช้งาน ในแต่ละวัน*/}
                    </View>
                </View>
                <SideMenu/>
            </Container>
        );
    }
}

FoodTypeScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'หมวดหมู่อาหาร'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const windows = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: windows.width,
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }

});

export default FoodTypeScreen;
