import React, {Component} from 'react';
import {AsyncStorage, Button, View, Text} from 'react-native';
import styles from "../App";


type Props = {};
export default class Server extends Component<Props> {

    constructor(props){
        super(props)
    }

    viewServer(){
    }

    render() {
        return (
            <View style={{width:"95%", backgroundColor:"#AAAAAA", padding: 10, margin: 10}}>
                <Text>{this.props.address}</Text>
                <Text>{this.props.name}</Text>
                <!-- Server status indicator -->
                <!-- Right arrow to click for more information -->
                <!-- More information will show: -->
                <!-- If account verified: event subscriptions -->
                <!-- If account not verified: server player count & input to verify account -->
            </View>
        )
    }

}