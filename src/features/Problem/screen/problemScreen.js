import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Container, Content } from 'native-base';
import SideMenu from '../../common/components/SideMenu';
import CommonText from '../../common/components/CommonText';
import HeaderTitle from '../../common/components/HeaderTitle';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';
import {MENUFOOD_SCREEN} from "../../MenuFood/router";
import {FOODDIARY_SCREEN} from "../../FoodDiary/router";
import {BMI_SCREEN} from "../../BMI/router";
import {TRICK_SCREEN} from "../../Trick/router";

class problemScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Content>
                        <Text style={styles.textTitle}>{'แจ้งปัญหา'}</Text>
                        <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'ชื่อหัวข้อ'}</Text>
                            <TextInput style={styles.inputBox}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       placeholderTextColor = "#068e81"
                                       onChangeText={UserPassword =>this.setState({UserPassword})}
                            />
                        </View>
                        <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'ประเภท'}</Text>
                            <TextInput style={styles.inputBox}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       placeholderTextColor = "#068e81"
                                       onChangeText={UserPassword =>this.setState({UserPassword})}
                            />
                        </View>
                        <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'รายละเอียด'}</Text>
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholder="Password"
                                   secureTextEntry={true}
                                   placeholderTextColor = "#068e81"
                                   onChangeText={UserPassword =>this.setState({UserPassword})}
                        />
                        <View style={{flexDirection: 'row' ,alignItems: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 20 , marginHorizontal: 20}}>{'เพิ่มรูป'}</Text>
                        </View>
                    </Content>
                </View>
                <SideMenu
                    diaryScreen={() => this.props.navigation.navigate( FOODDIARY_SCREEN )}
                    menuFoodScreen={() => this.props.navigation.navigate( MENUFOOD_SCREEN )}
                    bmiScreen={() => this.props.navigation.navigate( BMI_SCREEN )}
                    trickScreen={() => this.props.navigation.navigate( TRICK_SCREEN )}
                />
            </Container>
        );
    }
}

problemScreen.navigationOptions  = ({navigation}) => ({
    headerTitle: <HeaderTitle text={'เกี่ยวกับเรา'} />,
    headerLeft: <HeaderLeftMenu onPress={() => navigation.navigate('DrawerOpen')} />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    textTitle: {
        fontSize: 24,
        marginLeft: 20,
        textAlign: 'center'
    },
    inputBox: {
        width: 200,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#068e81',
        fontSize: 16,
        color: '#068e81',
        paddingLeft: 10,
        marginVertical: 5
    },

});

export default problemScreen;
