import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class userManualScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'คู่มือการใช้งาน'}</Text>
                <SideMenu/>
            </Container>
        );
    }
}

userManualScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'คู่มือการใช้งาน'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default userManualScreen;
