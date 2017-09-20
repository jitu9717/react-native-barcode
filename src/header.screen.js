import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableHighlight,TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',marginBottom:-40}}>
                        <Text style={{color: 'black',marginRight:10}}>Welcome, {this.state.user}</Text>
                        { this.state.showSignOut ?
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText} onPress={() => this.logOut()}>Sign out</Text>
                            </TouchableOpacity> : null
                        }
                    </View>
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({


    button:{
        width: 100,
        height: 20,
        backgroundColor: '#4197f4',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 10,
        marginLeft:10
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    }
});
