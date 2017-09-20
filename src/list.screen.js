import React, { Component } from 'react';
import {
    AsyncStorage,
    FlatList,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';



const STORAGE_LIST = '@BarCode:barcodelist';
const STORAGE_LOGIN = '@BarCode:login';

export default class App extends Component {
    constructor (props) {
        super(props);
            this.state = {
                scanlist: [],
                itemPushed:0,
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

    async _loadInitialState() {
        try {
            let scan = await AsyncStorage.getItem(STORAGE_LIST);
            if (scan !== null){
                let scanlist = JSON.parse(scan);
                this.setState({scanlist});
            }
        } catch (error) {
            console.log("Error at Initial Load",error);
        }

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


    async componentDidMount() {
        console.log('componentDidMount called')
        this._loadInitialState().done();
        const data  = this.props.navigation.state.params && this.props.navigation.state.params.data;
        if(data){
            const newScan = {};
            const splittedData = data.data && data.data.split('\n');
            splittedData && splittedData.forEach(function(element){
                let temp = element;
                 temp = element.split(':');
                if(temp[0]=='FN'){
                    newScan.name = temp[1];
                }
                if(temp[0]=='ORG'){
                    newScan.company = temp[1];
                }
                if(temp[0]=='TITLE'){
                    newScan.title = temp[1];
                }
                if(temp[0]=='EMAIL;WORK;INTERNET'){
                    newScan.email = temp[1];
                }
                if(temp[0]=='ADR'){
                    let tt = temp[1].split(';');
                    newScan.state = tt[4];
                    newScan.country = tt[6];
                }
            });

            if(Object.keys(newScan).length>0){
                const currentDate = new Date(); // // 03:00 AM, 6th Sep 2017
                let options = {day: "numeric", hour: "2-digit", minute: "2-digit", year: "numeric", month: "short"}
                newScan.id = parseInt(currentDate.getMilliseconds());
                newScan.date = currentDate.toLocaleTimeString("en-us", options),//currentDate;
                newScan.imageColor = '#F5B7B1';

                try {
                    let scanlist = await AsyncStorage.getItem(STORAGE_LIST);

                    const scanned = [newScan];
                    let temp = scanned;
                    if (scanlist !== null){
                        scanlist = JSON.parse(scanlist);
                        temp = [...scanned,...scanlist];
                    }

                    try {
                        let dd = await AsyncStorage.setItem(STORAGE_LIST, JSON.stringify(temp));
                        this.setState({scanlist:temp,itemPushed:1});

                    } catch (error) {
                        console.log("Error While get ScanList inside",error);
                    }
                } catch (error) {
                    console.log("Error While get ScanList outside",error);
                }
            }




        }

    }

    render() {
        const { navigate } = this.props.navigation;
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

                <View style={{flex:9}}>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={this.state.scanlist}
                        renderItem={({item}) =>
                            <TouchableOpacity onPress={() => navigate('Detail',{data:item})}>
                            <View style={{flex: 1, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1}} >
                                <View style={{flex: 2, width: 100, height: 50, backgroundColor: item.imageColor, borderRadius: 10, margin: 5}}></View>

                                <View style={{flex: 8, flexDirection: 'column'}}>
                                    <View><Text style={{fontSize: 17, marginTop: 10}}>{item.title}</Text></View>
                                    <View><Text style={{fontSize: 10, fontWeight: '300', marginTop: 5}}>{item.date}</Text></View>
                                </View>
                                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ic_chevron_right_48px.svg/768px-Ic_chevron_right_48px.svg.png'}} style={{width: 40, height: 30}}></Image>
                                </View>
                            </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View >
                    <TouchableHighlight style={styles.scanButton}
                                        underlayColor='grey' onPress={()=>{navigate('Scanner',{scanIt:true})}}>
                        <View>
                            <Text style={{fontSize: 13, color: 'black'}}>Scan</Text>
                        </View>

                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f4d942',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: '100',
        fontSize: 15
    },
    scanButton:{
        borderColor: '#000000',
        backgroundColor: '#BFC9CA',
        borderWidth: 1,
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 40,
        right:30,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
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
