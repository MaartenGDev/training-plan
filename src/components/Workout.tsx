import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {Workout as WorkoutModel} from "../models/Workout";

interface IProps {
    workout: WorkoutModel;
}

export const Workout: FunctionComponent<IProps> = ({workout}) => {
    return (
        <TouchableHighlight>
            <View style={styles.item}>
                <Text style={{fontWeight: 'bold'}}>Workout #{workout.id}!</Text>
                <Text style={{color: '#9B9B9B'}}>Sets: {workout.sets}</Text>
                <Text style={{color: '#9B9B9B'}}>Last Performed: {workout.date.toDateString()}</Text>
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
