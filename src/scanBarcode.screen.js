import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            showCamera: true
        }
    }

    componentDidMount (){
        const scanIt  = this.props.navigation.state.params && this.props.navigation.state.params.scanIt;
        if(!scanIt){
            this.props.navigation.navigate('List');
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.getAsync(Permissions.CAMERA);

        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View ></View>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1,alignItems:'center',justifyContent:'space-around'}}>
                    {this.state.showCamera ? <View style={{width: 400, height:400}}><BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    /></View> : <Text></Text>

                    }
                </View>
            );
        }
    }

    _handleBarCodeRead = (data) => {
        const { navigate } = this.props.navigation;
        if(data && this.state.showCamera){
            this.setState({showCamera: false});
            navigate('List',{data:data});
        }

    }
}