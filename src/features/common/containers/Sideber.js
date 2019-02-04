
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions } from 'react-navigation';
import { styles as s } from 'react-native-style-tachyons';
import { Container, Content, Thumbnail, ListItem, Left, Body } from 'native-base';
import { Alert, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import themeVariables from '../../../../native-base-theme/variables/platform';
import { APP_VERSION_TEXT } from '../../../common/constants';
import { LOGIN } from "../../User/router";
import { PROFILE_SCREEN } from "../../ProfileUser/router";
import { SETTING_SCREEN } from "../../Setting/router";
import { MESSAGEBOX_SCREEN } from "../../MessageBox/router";
import { PROBLEM_SCREEN } from "../../Problem/router";
import { ABOUT_SCREEN } from "../../About/router";
import CommonText from '../../common/components/CommonText';
import {getRouteName} from "../../User/redux/actions";
import Trans from "./Trans";

class Sideber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: this.props.routeName,
            ImgDefault: 'https://pngimage.net/wp-content/uploads/2018/06/user-avatar-png-6.png'
        };
    }

    _renderItem = ({item}) => {
        const isActive = this.state.menuActive === item.name;
        const fontColor = isActive ? '#fff' : '#2a9998';
        const isAndroid = themeVariables.platform === 'android';

        return (
            <View style={{backgroundColor: isActive ? '#2a9998' : '#fff'}}>
                <ListItem
                    style={[
                        styles.listItem,
                        s.m10
                    ]}
                    icon
                    onPress={() => {
                        this.setState({menuActive: item.name});
                        this.props.REDUCER_ROUNTNAME(item.name);

                        const resetAction = this.props.navigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'LOGIN'
                                })
                            ]
                        });

                        const navigateAction = this.props.navigationActions.navigate({
                            routeName: `${item.route}`,
                            params: item.params
                        });

                        if (item.route === LOGIN ) {
                            Alert.alert(
                                Trans.tran('Sideber.sign_out'),
                                Trans.tran('Sideber.want_Logout'),
                                [
                                    {text: Trans.tran('general.yes'), onPress: () => this.props.navigation.dispatch(resetAction)},
                                    { text: Trans.tran('general.canceled'), onPress: () => {}, style: "cancel" },
                                ]
                            )
                        } else {
                            this.props.navigation.dispatch(navigateAction);
                        }
                    }}
                >
                    <Left>{
                    item.icon === 'log-out' ?
                        <IconEntypo
                            style={[styles.listItemIcon, {color: fontColor}]}
                            name={item.icon}
                        />
                        :item.icon === 'user' ?
                        <IconEntypo
                            style={[styles.listItemIcon, {color: fontColor}]}
                            name={item.icon}
                        />
                            :item.icon === 'address-book-o' ?
                                <IconFontAwesome
                                style={[styles.listItemIcon, {color: fontColor}]}
                                name={item.icon}
                                />
                                :
                                <IconMaterialIcons
                                style={[styles.listItemIcon, {color: fontColor}]}
                                name={item.icon}/>
                    }
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                        <CommonText text={`${item.name}`} style={[styles.fontBase, s.ml2, {color: fontColor}]} weight={isAndroid ? 'bold' : null} />
                    </Body>
                </ListItem>
            </View>
        )
    };

    renderSeparator = () => {
        return(
            <View style = {{height: 1 , width: '100%', backgroundColor: '#232323'}} />
        )
    };

    aboutFuntion = () => {
        const { navigate } = this.props.navigation;

        this.setState({menuActive: 'about'});
        navigate({routeName: ABOUT_SCREEN});
    };

    render () {
        console.log('Update Store:',this.props);
        const { user } = this.props.users;
        const imgProfile = user.map((data) => {return data.imgProfile});
        const Names = user.map((data) => {return data.UserName});
        const BMRUser = user.map((data) => {return data.BMRUser});
        let profileImage = imgProfile.toString();
        let UserName = Names.toString();

        const menus = [
            {name: Trans.tran('Sideber.manage_Information'), icon: 'user', route: PROFILE_SCREEN, params: {isRootPage: true}},
            {name: Trans.tran('Sideber.message_box'), icon: 'message', route: MESSAGEBOX_SCREEN, params: {isRootPage: true}},
            {name: Trans.tran('Sideber.report_problem'), icon: 'report-problem', route: PROBLEM_SCREEN, params: {isRootPage: true}},
            {name: Trans.tran('Sideber.setting'), icon: 'settings', route: SETTING_SCREEN, params: {isRootPage: true}},
            {name: Trans.tran('Sideber.sign_out'), icon: 'log-out', route: LOGIN, params: {isRootPage: true}}
        ];

        return (
            <Container>
                <TouchableOpacity
                    style={styles.info}
                >
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Thumbnail
                            source={
                                profileImage
                                    ? {uri: profileImage}
                                    : {uri: this.state.ImgDefault}

                            }
                            style={styles.userThumb}
                        />
                        <View style={{justifyContent: 'space-between'}}>
                            <CommonText
                                text={UserName}
                                style={[styles.fontBase, {fontSize: 18, textAlign: 'center'}]}
                            />
                            <CommonText
                                text={`${Trans.tran('FoodDiary.energy_per_day')}:  ${BMRUser} ${Trans.tran('FoodDiary.calorie')}`}
                                style={styles.fontBase}
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
                <TouchableOpacity onPress={() => this.aboutFuntion()}>
                    <View style={[styles.footer,{backgroundColor: this.state.menuActive === 'about' ? '#999999' : '#e7e7e7'}]}>
                        <CommonText text={Trans.tran('About.about')} style={styles.footerFont} />
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
        backgroundColor: '#068e81',
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
        backgroundColor: 'transparent'
    },
    listItemIcon: {
        width: 30,
        color: '#000000',
        fontSize: 24,
    },
    footer: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
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
        color: '#fff',
        fontSize: 14,
        fontWeight: themeVariables.platform === 'ios' ? '600' : null,
        marginTop: '3%',
        marginLeft: '2%'

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
        users: state.dataUser,
        routeName: state.dataUser.routeName
    };
}

export default connect(
    mapStateToProps,
    (dispatch) => ({
        navigationActions: bindActionCreators(NavigationActions, dispatch),
        REDUCER_ROUNTNAME: bindActionCreators(getRouteName, dispatch),
    })
)(Sideber);
