import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, BackHandler,Text, View,Button} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class App extends React.Component{

      state = {
        backButtonEnabled:false,
        canGoBack: false,
        WEBVIEW_REF:null,
        isConnected:null,
      };

      componentDidMount(){

          NetInfo.isConnected.addEventListener('connectionChange',this._handleConnectivityChange);
          NetInfo.isConnected.fetch().done((ischeck)=>this.setState({isConnected:ischeck}));
          BackHandler.addEventListener('hardwareBackPress', this.backHandler);

      }
      componentWillUnmount(){
          NetInfo.isConnected.removeEventListener("connectionChange",this._handleConnectivityChange);
          BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
      }

      _handleConnectivityChange=()=>
      {
        
        this._handleOpenWebview;
      }


        _handleOpenWebview=()=>
      {
          if(this.state.isConnected==false)
          {
            Alert.alert("Sorry!!,there is no internet connection");
            return;
          }
      }


      backHandler = () => {
          if(this.state.backButtonEnabled) {
            this.state.WEBVIEW_REF.goBack();
              return true;
          }
      }

  
  render() {
    return(
      <WebView
       ref={(webView) => { this.state.WEBVIEW_REF = webView }}
        style={{flex: 1}}
        onNavigationStateChange=
           {(navState)=>this.onNavigationStateChange(navState)}
        source={{uri:"http://dashboard.owescm.com/"}}
        />);

  }


  onNavigationStateChange(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack
    });
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

});
