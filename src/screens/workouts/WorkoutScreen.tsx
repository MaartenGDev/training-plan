import React, {Component} from 'react';
import {View, SectionList, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Dimensions} from 'react-native';
import {Workout} from "../../components/Workout";
import {Workshop} from "../../models/Workshop";
import {Workout as WorkoutModel} from '../../models/Workout'
import {Exercise} from "../../components/Exercise";
import {DateHelper} from "../../helpers/DateHelper";

interface IProps {
    navigation: { navigate: any, state: { params: { workout: WorkoutModel } } },
    title: string,
}

export default class WorkoutScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;
        const {workout} = navigation.state.params;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <ScrollView>
                    <View style={styles.contentGroup}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#606F7B'}}>Workout #{workout.id}</Text>

                        <Text style={styles.heading}>Details</Text>
                        <View style={{marginTop: 4}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Date: </Text>
                                <Text
                                    style={{
                                        marginLeft: 2,
                                        color: '#4A4A4A'
                                    }}>{DateHelper.format(new Date(workout.exercises[0].dateTime), {includeDay: true})}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Exercises: </Text>
                                <Text style={{marginLeft: 2, color: '#4A4A4A'}}>{workout.exercises.length}</Text>
                            </View>
                        </View>

                        <Text style={styles.heading}>Exercises</Text>
                        <View style={{marginTop: 4}}>
                            {workout.exercises
                                .sort((e1, e2) => new Date(e1.dateTime).getTime() - new Date(e2.dateTime).getTime())
                                .map(exercise => <Exercise
                                    key={exercise.id + new Date(exercise.dateTime).getTime()}
                                    exercise={exercise}
                                    options={{showCategory: true}}
                                    onPress={clickedExercise => {
                                        navigation.navigate('Exercise', {exercise: clickedExercise})
                                    }}/>)}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    workouts: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 4,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heading: {
        fontSize: 14,
        marginTop: 15,
        color: '#606F7B'
    },
    tile: {
        marginRight: 5,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4299E1'
    },
    contentGroup: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }
});
