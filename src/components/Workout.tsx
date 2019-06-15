import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {Workout as WorkoutModel} from "../models/Workout";
import {DateHelper} from "../helpers/DateHelper";

interface IProps {
    workout: WorkoutModel;
    onPress: (workout: WorkoutModel) => void
}

export const Workout: FunctionComponent<IProps> = ({workout, onPress}) => {
    const exerciseDates = workout.exercises
        .map(x => new Date(x.dateTime))
        .sort((d1, d2) => d1.getTime() - d2.getTime());

    return (
        <TouchableHighlight onPress={e => onPress(workout)}>
            <View style={styles.item}>
                <Text style={{fontWeight: 'bold'}}>Workout #{workout.id}!</Text>
                <Text style={{color: '#9B9B9B'}}>{workout.exercises.length} Exercises</Text>
                <Text style={{color: '#9B9B9B'}}>{DateHelper.format(exerciseDates[0], {includeDay: true})} {DateHelper.getTime(exerciseDates[0])} - {DateHelper.getTime(exerciseDates[exerciseDates.length -1])}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderWidth: 0.2,
        borderColor: '#d6d7da',
        color: 'red'
    }
});
