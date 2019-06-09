import React, { Component } from 'react';
import {View, SectionList, StyleSheet, Text, FlatList} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Activity } from '../../components/Activity';
import {Workout} from "../../models/Workout";
import {Activity as ActivityModel} from "../../models/Activity";

export default class WorkoutScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Workouts',
    drawerIcon: ({tintColor}) => <Icon name="whatshot" size={30} color={tintColor}/>,
  };

  state = {
    workouts: [
        new Workout(1, 'Powwer hour', [
            new ActivityModel(2, 'Lower back', new Date()),
            new ActivityModel(3, 'Lower back', new Date()),
        ])
    ]
  };

  render () {
    const {workouts} = this.state;

    return (
      <SafeAreaView>
        <FlatList
            data={workouts}
            renderItem={({item}) => <View>
              <Text>{item.name}</Text>
              {item.activities.map(activity => <Activity key={activity.id} activity={activity}/>)}
            </View>}
            keyExtractor={(item, index) => item.id + ""}
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
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
