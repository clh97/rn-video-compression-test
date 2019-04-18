import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Video from 'react-native-video';
import RNFS from 'react-native-fs';

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