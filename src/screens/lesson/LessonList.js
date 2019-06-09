import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'

export default class LessonList extends Component {
  static navigationOptions = {
    drawerLabel: 'Lessons',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('./../../assets/book.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </SafeAreaView>
    );
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