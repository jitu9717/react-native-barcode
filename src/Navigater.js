import Login from './login.screen';
import List from './list.screen';
import Detail from './detail.screen';
import Scanner from './scanBarcode.screen';

import { StackNavigator } from 'react-navigation';

export const stackRoute = {
    List: {
        screen: List,
        navigationOptions:({navigation}) => ({
            title: "Your Scans",
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions:({navigation}) => ({
            title: "Details",
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
    Scanner: {
        screen: Scanner
    },
}

const stackNavigter = StackNavigator(stackRoute,{initialRouteName: 'List',});

export const tabRoute = {
    Login: {
        screen: Login,
        navigationOptions:({navigation}) => ({
            headerStyle: { marginTop: -57 }
        })
    },
    List: {
        screen: List, //stackNavigter,
        navigationOptions:({navigation}) => ({
            title: "List",
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions:({navigation}) => ({
            title: "Details",
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
    Scanner: {
        screen: Scanner
    },
};




