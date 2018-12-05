import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class settingScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'ตั้งค่า'}</Text>
                <SideMenu/>
            </Container>
        );
    }
}

settingScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'ตั้งค่า'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default settingScreen;
