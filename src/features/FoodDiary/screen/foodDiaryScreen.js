import React from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import HeaderTitle from '../../common/components/HeaderTitle';
import SideMenu from '../../common/components/SideMenu';
import { NavigationActions } from "react-navigation";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class foodDiaryScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <Text style={{fontSize: 40}}>{'FoodDiary'}</Text>
                <SideMenu/>
            </Container>
        );
    }
}

foodDiaryScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'FoodDiary'}/>,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

export default connect(
    null,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
    })
)(foodDiaryScreen);
