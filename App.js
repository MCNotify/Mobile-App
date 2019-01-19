import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, ScrollView} from 'react-native';
import AddServerButton from './components/AddServerButton';
import FirstTimeInformation from './components/FirstTimeInformation';
import Server from './components/Server';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);

    this.state = {
      servers: [],
    };

    this.refresh();
  }

  refresh(){
    try {
      AsyncStorage.getItem('servers').then((value) => {
        if(value !== null) {

          let parsed = JSON.parse(value);
          let serverList = [];

          for(let server in parsed) {
            let serverObj = <Server key={parsed[server].address} address={parsed[server].address} name={parsed[server].name}/>;

            serverList.push(serverObj);
          }
          this.setState({servers: serverList});
        }
      });
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    if(this.state.servers.length === 0) {
      return (
          <View style={styles.container}>
            <View style={styles.mainView}>
              <FirstTimeInformation/>
            </View>
            <View style={styles.addServerButton}>
              <AddServerButton onServerAdd={() => this.refresh()}/>
            </View>
          </View>
      );
    } else {
      return (
          <View style={styles.container}>
            <View style={styles.mainView}>
            <ScrollView>
              {this.state.servers}
            </ScrollView>
            </View>
            <View style={styles.addServerButton}>
              <AddServerButton onServerAdd={() => this.refresh()}/>
            </View>
          </View>
      );
    }
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  mainView: {
    flex: 9,
  },
  welcome: {
    flex: 6,
  },
  instructions: {
    flex: 4,
  },
  addServerButton: {
    flex: 1,
  }
});
