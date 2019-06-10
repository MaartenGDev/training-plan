import React, {Component} from 'react';
import {View, SectionList, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Exercise} from '../../components/Exercise';
import {TrainingSchedule} from "../../models/TrainingSchedule";
import {Exercise as ExerciseModel} from "../../models/Exercise";
import {GroupedActivityList} from "../../components/GroupedActivityList";
import {Workout} from "../../models/Workout";
import {Workshop} from "../../models/Workshop";

interface IProps {
    navigation: any
}

export default class TrainingSchedulesScreen extends Component<IProps> {
    state = {
        workouts: [
            new TrainingSchedule(1, 'Powwer hour', [
                new ExerciseModel(1, 'Lower back here', 'Lie on your back with your arms at the side of your body and the knees bent. Tighten the stomach muscles and slowly lift the buttocks from the floor. Press your feet hard down on the floor, and push your knees towards the wall facing you. You should still be able to raise your head, so the neck is not blocked. Hold your buttocks several seconds up from the floor and lower the buttocks again to just above the floor.', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/105.jpg', '12-12-15', new Date(), [
                    new Workout(1, '12-12-15', new Date('2017-11-12')),
                    new Workout(2, '12-12-16', new Date('2018-11-12')),
                    new Workout(3, '12-12-16', new Date('2018-11-12')),
                ], [
                    new Workshop(1, 'Bosu Training'),
                    new Workshop(2, 'Free Weight'),
                    new Workshop(3, 'Gym ball'),
                ]),
                new ExerciseModel(2, 'Lower back here', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/104.jpg', '12-12-15', new Date(), [
                    new Workout(1, '12-12-15', new Date('2017-11-12')),
                    new Workout(2, '12-12-16', new Date('2018-11-12')),
                    new Workout(3, '12-12-16', new Date('2018-11-12')),
                ], [
                    new Workshop(1, 'Bosu Training'),
                    new Workshop(2, 'Free Weight'),
                    new Workshop(3, 'Gym ball'),
                ]),
            ])
        ]
    };

    render() {
        const {navigation} = this.props;
        const {workouts} = this.state;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <GroupedActivityList exercisesByGroupName={workouts} onExercisePress={exercise => {
                    navigation.navigate('Exercise', {exercise: exercise, title: 'oef'})
                }}/>
            </SafeAreaView>
        );
    }
}
