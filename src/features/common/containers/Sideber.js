
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from 'react-navigation';
import { styles as s } from 'react-native-style-tachyons';
import { Container, Content, Thumbnail, ListItem, Left, Body } from 'native-base';
import { Alert, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import themeVariables from '../../../../native-base-theme/variables/platform';
import { APP_VERSION_TEXT } from '../../../common/constants';
import CommonText from '../../common/components/CommonText';
import { LOGIN, PRAVIEDKEY } from "../../User/router";
import { PROFILE_SCREEN } from "../../ProfileUser/router";
import { EXERCISE_SCREEN } from "../../Exercise/router";
import { USERMANUAL_SCREEN } from "../../UserManual/router";
import { SETTING_SCREEN } from "../../Setting/router";
import { ABOUT_SCREEN } from "../../About/router";
import * as API from "../../User/api/api";

class Sideber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: 'home',
        };
    }

    // componentDidUpdate(prevProps, prevState) {
    //     // One possible fix...
    //     const routeName = this.props.routerName;
    //     if (this.state.screebSideber !== routeName ) {
    //         this.setState({ screebSideber: routeName });
    //     }
    // }

    _renderItem = ({item}) => {
        const isActive = this.state.menuActive === item.name;
        const fontColor = isActive ? '#fff' : '#2a9998';
        const isAndroid = themeVariables.platform === 'android';
        const { navigate } = this.props.navigation;

        return (
            <ListItem
                style={[
                    styles.listItem,
                    s.m10,
                    {backgroundColor: isActive ? '#2a9998' : '#fff'}
                ]}
                icon
                onPress={() => {
                    this.setState({menuActive: item.name});

                    if (item.route === null ) {
                        Alert.alert(
                            'ออกจากระบบ',
                            'ต้องการออกจากระบบ ?',
                            [
                                {text: 'ตกลง', onPress: () => navigate({routeName: LOGIN})},
                                /*this.props.NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: item.route,
                                    params:  item.params
                                })
                            ]
                        }) //มาทำแบบนี้ให้ได้*/
                                {text: 'ยกเลิก'}
                            ]
                        )
                    } else {
                        navigate({
                            routeName: `${item.route}`,
                            params: item.params
                        })
                    }
                }}
            >
                <Left>{
                item.icon === 'log-out' ?
                    <IconEntypo
                        style={[styles.listItemIcon, {color: fontColor}]}
                        name={item.icon}
                    />
                    :<IconFontAwesome
                    style={[styles.listItemIcon, {color: fontColor}]}
                    name={item.icon}
                />}
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                    <CommonText text={`${item.name}`} style={[styles.fontBase, s.ml2, {color: fontColor}]} weight={isAndroid ? 'bold' : null} />
                </Body>
            </ListItem>
        )
    };

    renderSeparator = () => {
        return(
            <View style = {{height: 1 , width: '100%', backgroundColor: '#232323'}} />
        )
    };

    render () {
        const { navigate } = this.props.navigation;
        //const { first_name, last_name, employee_id, manager } = this.props.users;
        const profileImage = 'https://randomuser.me/api/portraits/thumb/men/97.jpg';

        const menus = [
            {name: 'จัดการข้อมูลส่วนตัว', icon: 'foot', route: PROFILE_SCREEN},
            {name: 'ท่าออกกำลังกาย', icon: 'book', route: EXERCISE_SCREEN, params: {isRootPage: true}},
            {name: 'คู่มือการใช้งาน', icon: 'food', route: USERMANUAL_SCREEN},
            {name: 'ตั้งค่า', icon: 'list', route: SETTING_SCREEN, params: {isRootPage: true}},
            {name: 'ออกจากระบบ', icon: 'log-out', route: null}
        ];

        return (
            <Container>
                <TouchableOpacity
                    style={styles.info}
                    onPress={ () => navigate({routeName: PROFILE_SCREEN})}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Thumbnail
                            source={
                                profileImage
                                    ? {uri: profileImage}
                                    : require('../../../../pulic/assets/images/user-default.png')

                            }
                            style={styles.userThumb}
                        />
                        <View>
                            <CommonText
                                text={'first_name'}
                                style={[styles.fontBase, s.b,{fontSize: 18}]}
                            />
                            <CommonText
                                text={`หลังงานที่ต้องการต่อวัน:  ${'1999'}  kcal`}
                                style={[styles.fontBase, s.fw3, {fontSize: 10}]}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Content style={[s.bg_white]}>
                    <FlatList
                        data={menus}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </Content>
                <TouchableOpacity
                    onPress={ () => navigate({routeName: ABOUT_SCREEN})}
                >
                    <View style={styles.footer}>
                        <CommonText text={'เกี่ยวกับเรา'} style={styles.footerFont} />
                        <CommonText text={`version ${APP_VERSION_TEXT}`} style={styles.version} />
                    </View>
                </TouchableOpacity>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    info: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    managerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7',
    },
    managerIcon: {
        width: 50,
        textAlign: 'right',
        fontSize: 24,
        color: '#000',
    },
    textLeftMinus: {
        marginTop: -5,
        fontSize: 18,
    },
    listItem: {
        flexDirection: 'row',
        paddingLeft: 20,
        height: 50,
        alignItems: 'center',
    },
    listItemIcon: {
        width: 30,
        color: '#000000',
        fontSize: 24,
    },
    footer: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#e7e7e7',
        height: 50,
    },
    footerFont: {
        fontSize: 16,
        fontWeight: '300',
    },
    userThumb: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    fontBase: {
        color: '#991b1f',
        fontSize: 14,
        fontWeight: themeVariables.platform === 'ios' ? '600' : null
    },
    version: {
        fontSize: 14,
        fontWeight: '300',
        position: 'absolute',
        right: 4,
        bottom: 2
    }
});

function mapStateToProps(state) {
    return{
        routerName : state.routeName
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        NavigationActions: bindActionCreators(NavigationActions, dispatch),
        Flights_DATA: bindActionCreators(API.fetchTodo, dispatch),
    })
)(Sideber);