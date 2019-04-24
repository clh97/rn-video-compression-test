import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import { NativeModules } from 'react-native';
import BackgroundTask from 'react-native-background-task'

import CameraScreen from './CameraScreen';

class App extends React.Component {

  state = {
    videos: null,
    videoSrc: null
  }

  componentWillMount() {
    RNFS.readDir('file:///data/user/0/com.rn_camera_test/cache/Camera')
      .then((result) => {
        console.log('GOT RESULT', result);
        this.setState({
          videos: result,
          videoSrc: result[result.length - 1].path
        }, () => {
          console.log(this.state.videos)
        })
      })
  }

  pick = () => {
    ImagePicker.showImagePicker({
      title: 'Select Video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }, (response) => {
      console.dir(response)
    })
  }

  startCompression = () => {
    console.log('compression started!')
    // NativeModules.CompressionModule.compress("/storage/emulated/0/DCIM/Camera/720.mp4", "/storage/emulated/0/DCIM/Camera/720giraffe2.mp4",

    NativeModules.CompressionModule.compress(this.state.videoSrc, "/storage/emulated/0/DCIM/Camera/720giraffe2.mp4",
      (a) => {
        // console.log('compression started!')
        console.log(a)
      },
      (b) => {
        // console.log('compression finished!')
        console.log(b)
      });
      
    BackgroundTask.define(() => {
      console.log('bg task.. compression!')
      BackgroundTask.finish()
    })


    setTimeout(() => {

      BackgroundTask.schedule()
    }, 500);

    
    // console.log(NativeModules.CompressionModule)
    // NativeModules.CompressionModule.compress("/storage/emulated/0/DCIM/Camera/720.mp4", "/storage/emulated/0/DCIM/Camera/720giraffe.mp4",
    //   (a) => {
    //     console.log('compression started!')
    //     console.log(a)
    //   },
    //   (b) => {
    //     console.log('compression progress!')
    //     console.log(b)
    //   },
    //   (c) => {
    //     console.log('compression done!')
    //     console.log(c)
    //   },
    //   (d) => {
    //     console.log('compression error!')
    //     console.log(d)
    //   });

  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <Button title='open' onPress={() => this.props.navigation.navigate('Camera')} />

        {
          this.state.videoSrc &&
          <Video
          style={{
            width: 136 * 2,
            height: 76 * 2
          }}
          source={{
            // uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            uri: this.state.videoSrc
          }}
          />
        }
        <Button title='escolher' onPress={() => this.pick()} />
        <Button title='comprimir' onPress={() => this.startCompression()} />
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


const AppNavigator = createStackNavigator({
  App: {
    screen: App
  },
  Camera: {
    screen: CameraScreen,
  }
},
  {
    initialRouteName: 'App'
  });

export default createAppContainer(AppNavigator);