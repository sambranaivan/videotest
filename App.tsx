
import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { Video, Audio } from 'expo-av';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default class App extends Component
 {


  _handleVideoRef = component => {
   
    this.setState({video1:component})
  
  }

  async componentDidMount () {
   
    let { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.AUDIO_RECORDING, Permissions.CAMERA_ROLL)
    
  }

 
  record:Promise<any> = null;
 
  
  state = { 
    isShowingText: "algo",
    record: null,
    video2:null,
    camera:null,
    grabacion:null,
    cameraPermission:null,
    grabando:false
  };

play = async ()=>{
  this.setState({grabando:true})
  this.state.video2.playAsync();
  this.record = this.state.camera.recordAsync({
    quality:'480p'
  });
}

stop = async () =>{
  this.state.camera.stopRecording();
  this.state.video2.stopAsync();
  this.record.then(async (grabacion)=>{
    this.setState({ grabando: false })
    console.log(grabacion)
    
    const asset = await MediaLibrary.createAssetAsync(grabacion.uri);
    if (asset) {
      this.setState({ grabacion: null });
    }

  })

  
}

  render() {
    
     return (
      <View style={styles.container}>
            <Text>{this.state.isShowingText}</Text>
        <Camera 
        ref = {ref => this.state.camera = ref}
           style={{ width: 300, height: 200 }}
        
        >

        </Camera>
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
      {
        !this.state.grabando?
           <TouchableOpacity onPress={this.play}>
             <Text>Play</Text>
           </TouchableOpacity>   
        :
      <TouchableOpacity onPress={this.stop}>
      
             <Text>Stop</Text>
           </TouchableOpacity>
      }
         
        
         
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
