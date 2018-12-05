import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class TrickScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'Trick'}</Text>
                <SideMenu/>
            </Container>
        );
    }
}

TrickScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'Trick'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default TrickScreen;
