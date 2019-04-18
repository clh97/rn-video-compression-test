import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RNCamera, TouchableOpacity } from 'react-native-camera';

export default class CameraScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Camera',
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
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
        {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <Text>Pending</Text>;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              </View>
            );
          }}
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
});
