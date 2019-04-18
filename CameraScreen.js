import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RNFS from 'react-native-fs';

export default class CameraScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Camera',
  };

  state = {
    recording: false
  }

  componentDidMount() {

  }

  startRecording = async () => {
    this.setState({
      recording: true
    });
    let result = await this.camera.recordAsync({
      quality: RNCamera.Constants.VideoQuality['720p'],
      videoBitrate: 5,
      // orientation: 'landscapeLeft',
      codec: Platform.OS === 'ios' ? RNCamera.Constants.VideoCodec['H264'] : null,
      // path: 'file:///storage/emulated/0/Pictures/'
      // path: RNFS.DocumentDirectoryPath,
      // path: 'file:///data/user/0/com.rn_camera_test/cache/Camera/',
      mute: false,
      // maxDuration: 5,
      // quality: RNCamera.Constants.VideoQuality['288p'],
    });

    console.log(result)

  }

  pauseRecording = () => {
    const stopped = this.camera.stopRecording();
    // console.log(stopped)
    this.setState({
      recording: false
    });
  }

  render() {

    const {
      recording
    } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          ref={ref => {
            this.camera = ref;
          }}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <View style={styles.controls}>
            <TouchableOpacity onPress={recording ? () => this.pauseRecording() : () => this.startRecording()} style={styles.cameraButton}>
              <Text style={styles.cameraButtonText}>
                {recording ? 'stop' : 'start'}
              </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: 80,
    backgroundColor: 'transparent'
  },
  cameraButton: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgb(255, 0, 0)'
  },
  cameraButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});
