import React from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode';

class profile_list extends React.Component {
    state = {
        Text_Input: '',
        Text_Output: ''
    };

    getTextInputValue=()=>{
        this.setState({
            Text_Output: this.state.Text_Input
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}> {'สามารถเพิ่มเพื่อนได้ง่ายๆ เพียงแสกน คิวอาร์โค้ต ด้างล่างนี้ '} </Text>
                <View style={styles.borderQrcode}>
                    <View style={styles.viewQrcode}>
                        <QRCode
                            value={this.state.Text_Output}
                            size={200}
                            bgColor='#fff'
                            fgColor='#000'
                        />
                    </View>
                </View>
                <Text style={styles.textTitle}> {'เปลี่ยน QRcode '} </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({Text_Input: text})}
                    underlineColorAndroid={"transparent"}
                    placeholder={"กรอกข้อมูล QRCode"}
                />
                <TouchableOpacity
                    onPress={this.getTextInputValue}
                    activeOpacity={0.7}
                    style={styles.button}
                >
                    <Text style={styles.textStyle}>{'Generate'}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

profile_list.navigationOptions  = ({navigation}) => ({
    header: null
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ABABAB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 8,
        backgroundColor: '#c41f27',
        borderRadius: 7,
        marginVertical: 20
    },
    textStyle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 18
    },
    textTitle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 18
    },
    viewQrcode: {
        borderWidth: 6,
        borderColor: '#ABABAB'
    },
    borderQrcode: {
        borderWidth: 7,
        borderColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 40
    }

});

export  default profile_list;
