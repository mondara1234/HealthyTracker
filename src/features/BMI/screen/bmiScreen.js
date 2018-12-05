import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class bmiScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'BMI'}</Text>
                <SideMenu/>
            </Container>
        );
    }
}

bmiScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'BMI'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default bmiScreen;
