import React from 'react';
import {View, Text} from 'react-native';
import {H1} from 'native-base';

class CommonTime extends React.PureComponent {
    constructor(props){
        super(props);
        
        this.state ={
            time: ''
        }
    }

    componentDidMount() {
        this.Clock = setInterval( () => this.GetTime(), 1000 );
    }

    componentWillUnmount(){
        clearInterval(this.Clock);
    }

    GetTime() {
        let date, hour, minutes, seconds, fullTime;

        date    = new Date();
        hour    = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        if (minutes < 10) {
            minutes = '0' + minutes.toString();
        }
        if (seconds < 10) {
            seconds = '0' + seconds.toString();
        }
        fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();

        this.setState({
            time: fullTime
        });
    }

    render() {
        return (
            <View>
                <Text style={{textAlign:'center',fontSize: 16, fontWeight: '500', color: '#068e81'}}> {this.state.time} </Text>
            </View>
        )
    }
};

export default CommonTime;
