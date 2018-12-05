import React,{Component} from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { Item, Input, Icon } from 'native-base';
import RenderItemListLocation from '../components/RenderItemListLocation';
import HeaderLeftMenu from '../../common/components/HeaderLeftMenu';


class ShowListActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('http://localhost/My_SQL/ShowAllDataList.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function() {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderItem = ({item, index}) => {
              let checknamber = item.number <= 4 ? false : true;
        return (
            <RenderItemListLocation
                navigate={this.props.navigation.navigate}
                checkType={'EDITDATA'}
                index={index}
                item={item}
                checkNamber={checknamber}
            />
        )
    };

        render() {
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, {paddingTop: 20}]}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (

            <View style={styles.container}>
                <View style={[styles.Searchstyle,{marginTop:30,marginBottom:10,}]}>
            <Item >
                <Icon name="search" underlineColorAndroid='rgba(0,0,0,0)'/>
                <Input style={[styles.Searchstyle,{paddingLeft:30}]} placeholder="Select data" placeholderTextColor = "#ffffff"/>
            </Item>
                </View>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                />
        </View>
        );
    }

}

ShowListActivity.navigationOptions  = ({navigation}) => ({
    headerTitle: <Text> {'ShowList'} </Text>,
    headerRight: <HeaderLeftMenu onPress={() => navigation.openDrawer()} />
});

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#455a64',
        flex: 1
    },
    Searchstyle :{
       backgroundColor: 'rgba(255, 255,255,0.2)'
    },
    rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    }

});

export default ShowListActivity;