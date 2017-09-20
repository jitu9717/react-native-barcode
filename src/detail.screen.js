import React, { Component } from 'react';

import {
    AsyncStorage,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';


const STORAGE_LOGIN = '@BarCode:login';

export default class Detail extends Component {

    constructor (props) {
        super(props);
        this.state = {
            showSignOut:false,
            user:'Guest'
        }
    }

    async logOut() {
        try {
            await AsyncStorage.removeItem(STORAGE_LOGIN);
            this.setState({showSignOut:false,user:'Guest'});
        } catch (error) {
            console.log("Error",error.message);
        }
    }

    async componentDidMount() {
        try {
            let login = await AsyncStorage.getItem(STORAGE_LOGIN);
            if (login !== null){
                let userDetail = JSON.parse(login);

                if(userDetail && userDetail.loggedIn){
                    const user = userDetail.name && userDetail.name.split(' ')[0];
                    this.setState({showSignOut:true,user:user});

                }
            }
        } catch (error) {
            console.log("Error at Initial Load",error);
        }
    }
    render() {
        const { data }  = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',marginBottom:-40}}>
                    <Text style={{color: 'black',marginRight:10}}>Welcome, {this.state.user}</Text>
                    { this.state.showSignOut ?
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => this.logOut()}>Sign out</Text>
                        </TouchableOpacity> : null
                    }
                </View>
                <View style={{flex: 9}}>
                    <View style={{flex: 8, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1}}>
                        <Image source={{uri: 'https://sociobiology.files.wordpress.com/2013/07/strassmann-queller-qr-code.jpg'}} style={{width: 180, height: 180}}>
                        </Image>
                        <Text style={{fontSize: 12, fontWeight: '300', marginTop: 10}}>{data.date}</Text>
                        <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>{data.title}</Text>
                    </View>
                    <View style={{flex: 5, flexDirection: 'row', marginTop: 10}}>
                        <View style={{flex: 4, alignItems: 'flex-end'}}>
                            <Text style={styles.dataKey}>Name  </Text>
                            <Text style={styles.dataKey}>Email  </Text>
                            <Text style={styles.dataKey}>Company  </Text>
                            <Text style={styles.dataKey}>State  </Text>
                            <Text style={styles.dataKey}>Country  </Text>
                        </View>
                        <View style={{flex: 7}}>
                            <Text style={styles.dataValue}>{data.name}</Text>
                            <Text style={styles.dataValue}>{data.email}</Text>
                            <Text style={styles.dataValue}>{data.company}</Text>
                            <Text style={styles.dataValue}>{data.state}</Text>
                            <Text style={styles.dataValue}>{data.country}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    header: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f4d942',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataKey: {
        fontSize: 15,
        marginTop: 10
    },
    dataValue: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10
    },
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