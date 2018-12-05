import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class VirtualKeyboard extends Component {

    Backspace() {
        return (
            <TouchableOpacity
                style={styles.backspace}
                onPress={() => { this.onPress('back') }}
            >
                <Icon
                    size={33}
                    name="md-arrow-back"
                />
            </TouchableOpacity>
        );
    }
    //รูปแบบแสดงของปุ่ม
    Cell(symbol) {
        return (
            <TouchableOpacity
                key={symbol}
                style={styles.cell}
                onPress={() => { this.onPress(symbol.toString()) }}
                disabled={this.props.disableds}
            >
                <Text style={styles.number}>
                    {symbol}
                </Text>
            </TouchableOpacity>
        );
    }
    //คำสั่งแสดงปุุ่มตามตัวเลขได้รับมา
    Row(numbersArray) {
        let cells = numbersArray.map((val) => this.Cell(val));
        return (
            <View style={styles.row}>
                {cells}
            </View>
        );
    }

    onPress(val) {
        this.props.onPress(val);
    }

        render() {
                return (
                    <View style={styles.container}>
                        {this.Row([1, 2, 3])}
                        {this.Row([4, 5, 6])}
                        {this.Row([7, 8, 9])}
                        <View style={styles.row}>
                            {this.props.decimal === true ? this.Cell('.') : <View style={{flex: 1}}/>}
                            {this.Cell(0)}
                            {this.Backspace()}
                        </View>
                    </View>
                );
            }
        }

VirtualKeyboard.propTypes = {
    pressMode: PropTypes.oneOf(['string', 'char']),
    onPress: PropTypes.func.isRequired,
    disableds: PropTypes.bool.isRequired,
    decimal: PropTypes.bool
};

VirtualKeyboard.defaultProps = {
    pressMode: '',
    decimal: false
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        alignItems: 'flex-start'
    },
    row: {
        flexDirection: 'row',
        marginTop: 40
    },
    number: {
        fontSize: 35,
        textAlign: 'center'
    },
    backspace: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell: {
        flex: 1,
        justifyContent: 'center'
    },
});

export  default VirtualKeyboard;
