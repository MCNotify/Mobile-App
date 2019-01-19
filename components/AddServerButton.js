import React, {Component} from 'react';
import {BackHandler, AsyncStorage, TouchableHighlight, View, Modal, Text, TextInput} from 'react-native';
import Server from "../components/Server";


type Props = {};
export default class AddServerButton extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            serverIp: "",
            serverName: "",
        };

        BackHandler.addEventListener('hardwareBackPress', () => {this.toggleModal(false)})
    }

    toggleModal(state){
        this.setState({modalVisible: state});
    }

    newServer(){
        // Create a a new server object
        let self = this;

        try {
            AsyncStorage.getItem('servers').then((value) => {

                let parsed = [];

                if (value !== null) {
                    parsed = JSON.parse(value);
                }


                parsed.push({address: self.state.serverIp, name: self.state.serverName});

                AsyncStorage.setItem('servers', JSON.stringify(parsed)).then(() => {

                    // Reset modal, refresh parent.
                    self.setState({
                        modalVisible: false,
                        serverIp: "",
                        serverName: "",
                    });

                    self.props.onServerAdd();

                });
            });
        } catch (error) {
            // Error retrieving data

        }
    }

    render() {
        return (
            <View style={{width:"100%", height: "100%"}}>
                <TouchableHighlight onPress={() => this.toggleModal(true)} style={{backgroundColor: "#32CD32", alignItems: "center", justifyContent: "center", height: "100%"}}>
                    <Text style={{fontSize: 18, color:"#FFFFFF"}}>Add Server</Text>
                </TouchableHighlight>


                <Modal animationType={"fade"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {}}>

                    <View style={{width:"100%", height: "100%"}}>
                        <View style={{flex: 4}}>
                            <Text>Server Name (Optional):</Text>
                            <TextInput placeholder={"Server name"} onChangeText={(text) => this.setState({serverName: text})}/>
                        </View>

                        <View style={{flex: 4}}>
                            <Text>Minecraft server address:</Text>
                            <TextInput placeholder={"Server address"} onChangeText={(text) => this.setState({serverIp: text})}/>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableHighlight style={{backgroundColor: "#FF0000", alignItems: "center", justifyContent: "center", height: "100%", width: "50%"}} onPress={() => this.toggleModal(false)}>
                                <Text style={{fontSize: 18, color:"#FFFFFF"}}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={{backgroundColor: "#32CD32", alignItems: "center", justifyContent: "center", height: "100%", width: "50%"}} onPress={() => this.newServer()}>
                                <Text style={{fontSize: 18, color:"#FFFFFF"}}>Verify</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </Modal>


            </View>
        )
    }

}