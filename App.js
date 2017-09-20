import React, { Component } from 'react';
import { Permissions, Notifications } from 'expo';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { tabRoute } from './src/Navigater';

const Navigator = StackNavigator(tabRoute,{initialRouteName: 'Login',});
//const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

import Sentry from 'sentry-expo';
Sentry.enableInExpoDevelopment = true;
// import { SentrySeverity, SentryLog } from 'react-native-sentry';
Sentry.config('https://34d42f6ab6514edba61ff573af06b565@sentry.io/216373').install();


export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            token:''
        }
    }
    async registerForPushNotificationsAsync() {
        const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        this.setState({token});

        // POST the token to our backend so we can use it to send pushes from there
        /*return fetch(PUSH_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    value: token,
                },
                user: {
                    username: 'Jitender',
                },
            }),
        });*/
    }

    componentDidMount(){
        this.registerForPushNotificationsAsync();
    }

    render() {
        return (
            <Navigator onNavigationStateChange={null}/>
        );
    }
}

