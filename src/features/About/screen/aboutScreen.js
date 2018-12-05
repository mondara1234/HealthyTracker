import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import CommonText from '../../common/components/CommonText';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class aboutScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'เกี่ยวกับเรา'}</Text>
            </Container>
        );
    }
}

aboutScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <CommonText text={'เกี่ยวกับเรา'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default aboutScreen;
