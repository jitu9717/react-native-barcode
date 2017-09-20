import React, { Component } from 'react';
import {
    AsyncStorage,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import { Constants, Facebook } from 'expo';

const STORAGE_LOGIN = '@BarCode:login';

export default class Login extends Component {
    async  logIn() {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('1942278382695106', {
            permissions: ['public_profile','email', 'user_friends'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`);
            const details = await response.json();
            Alert.alert(
                'Logged in!',
                `Hi ${details.name}!`,
            );

            const loginDetail ={
                loggedIn : true,
                name: details.name
            }
            try {
                await AsyncStorage.setItem(STORAGE_LOGIN, JSON.stringify(loginDetail));
            } catch (error) {
                console.log("Error While Login",error);
            }
            this.props.navigation.navigate('List');
        }
    }

    async componentDidMount() {
        try {
            let login = await AsyncStorage.getItem(STORAGE_LOGIN);
            if (login !== null){
                let userDetail = JSON.parse(login);

                if(userDetail && userDetail.loggedIn){
                    this.props.navigation.navigate('List');
                }
            }
        } catch (error) {
            console.log("Error at login",error);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{flex:5, justifyContent: 'flex-end'}}>
                    <Image source={{uri: 'https://logo.clearbit.com/react-native.eu?s=128&size=100'}} style={{width: 140, height: 140, borderRadius: 70}}></Image>
                </View>
                <View style={{flex:2}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.logIn()}>Login with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <Text onPress={() => navigate('List')} >Skip this step</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#3B5998',//3ecf0f1
    },
    button:{
        width: 240,
        height: 50,
        backgroundColor: '#4197f4',
        margin: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    }
});
