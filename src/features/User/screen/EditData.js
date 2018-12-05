import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Logo from '../components/Logo';
import FormEdit from './FormScreen/FormEdit';
import FormUpdate from './FormScreen/FormUpdate';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';

class EditData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInput_ID: ''
        }
    }

    componentDidMount(){
        this.setState({
            TextInput_ID : this.props.navigation.state.params.ID
        })
    }

    render() {
        return (
            <View style={styles.container} >
                <Logo  Title={'Edit Data'} />
                <FormUpdate GetInput_ID = {this.state.TextInput_ID} />
                <FormEdit GetInput_ID = {this.state.TextInput_ID} />
            </View>
        );
    }

}

EditData.navigationOptions  = ({navigation}) => ({
    headerTitle: <Text> {'EditData'} </Text>,
    headerRight: <HeaderLeftMenu onPress={() => navigation.openDrawer()} />
});

const styles = StyleSheet.create({
    container : {
        paddingBottom: 60,
        paddingTop:20,
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    StyleText : {
        marginVertical: 15,
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    }
});

export default EditData;