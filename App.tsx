
import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';

export default class App extends Component
 {

  _handleVideoRef = component => {
   
    this.setState({video1:component})
  
  }
 
  
  state = { 
    isShowingText: "algo",
    video1: null,
    video2:null,

  };

play = ()=>{
  this.state.video1.playAsync();
  this.state.video2.playAsync();
}

  render() {
    
     return (
      <View style={styles.container}>
            <Text>{this.state.isShowingText}</Text>
        <Video
           ref={this._handleVideoRef}
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          // shouldPlay
          isLooping
          style={{ width: 300, height: 200 }}
        />
         <Video
           ref={(ref)=>this.state.video2 = ref}
           source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
           rate={1.0}
           volume={1.0}
           isMuted={false}
           resizeMode="cover"
           // shouldPlay
           isLooping
           style={{ width: 300, height: 200 }}
         />
        <TouchableOpacity onPress={this.play}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    ); 
    
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
