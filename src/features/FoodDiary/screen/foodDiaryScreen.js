import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HeaderTitle from '../../common/components/HeaderTitle';

class foodDiaryScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'FoodDiary'}</Text>
            </Container>
        );
    }
}

foodDiaryScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'FoodDiary'}/>,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default foodDiaryScreen;
