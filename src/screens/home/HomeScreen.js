import React, { Component } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('./../../assets/home.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Hello Home!</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})