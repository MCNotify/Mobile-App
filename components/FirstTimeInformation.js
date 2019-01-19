import {Text, View} from "react-native";
import React, {Component} from 'react';
import styles from "../App";

export default class FirstTimeInformation extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 32}}>Welcome to MCNotify!</Text>
                <Text style={{fontSize: 18}}>To get started, add a server!</Text>
            </View>
        )
    }
}