import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import CameraScreen from './CameraScreen';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title='open' onPress={() => this.props.navigation.navigate('Camera')} />
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