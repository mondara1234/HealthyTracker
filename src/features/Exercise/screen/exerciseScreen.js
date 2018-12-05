import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class exerciseScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'ท่าออกกกำลังกาย'}</Text>
            </Container>
        );
    }
}

exerciseScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'exercise'}/>,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default exerciseScreen;
