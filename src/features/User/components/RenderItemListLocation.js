import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, Alert, Text} from "react-native";
import { Card, CardItem, Body, Right } from 'native-base';

const RenderItemListLocation = (props) => {
    let dii = props.checkNamber;
    return (
        <Card>
            <CardItem
                button
                disabled={dii}
                style={[styles.styleCardButton,{backgroundColor: dii === true ? "#c1bfe2" : "#6dffff"}]}
                onPress={() =>{dii === true ?
                    Alert.alert(
                        'Alert Title',
                        'INBITZTH',
                        [   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'มึงจะกดไหม', onPress: () =>  Alert.alert(
                                    'กดOKแล้ว')},
                        ],
                        { cancelable: false,
                            tintColor:'#ff5234'})  :
                    props.navigate(props.checkType,{
                        ID: props.item.ID
                    })
                }}
            >
                <CardItem style={styles.styleCardItem}>
                    <Body>
                        <Image
                            source={{uri: props.item.name}}
                            style={styles.stylePicture}
                        />
                        <Text style={styles.styleCommonText}>
                            text={props.item.email}
                        </Text>
                        <Text style={styles.styleCommonText}>
                            text={props.item.password}
                        </Text>
                        <Right>
                            <Text style={styles.styleCommonText}>
                                {props.item.number}
                            </Text>
                        </Right>
                    </Body>
                </CardItem>
            </CardItem>
        </Card>
    )
};

RenderItemListLocation.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    checkType: PropTypes.string,
    navigate: PropTypes.function,
    checkNamber: PropTypes.boolean

};

RenderItemListLocation.defaultProps = {
    checkType: '',
    navigate: '',
    checkNamber: ''
};


const styles = StyleSheet.create({
    stylePicture: {
        width: '100%',
        height: 200,
        marginBottom: 5
    },
    styleCommonText: {
        paddingLeft: 25
    },
    styleCardItem: {
        backgroundColor: 'rgba(255,255,255, 0)',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    styleCardButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default RenderItemListLocation;
