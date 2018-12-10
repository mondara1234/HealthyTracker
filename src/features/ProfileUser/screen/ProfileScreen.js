import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class profileScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'จัดการข้อมูลส่วนตัว'}</Text>
                <SideMenu/>
            </Container>
        );
    }
}

profileScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'จัดการข้อมูลส่วนตัว'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default profileScreen;
