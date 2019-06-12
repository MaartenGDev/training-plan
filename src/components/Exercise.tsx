import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {Exercise as ExerciseModel} from "../models/Exercise";

interface IProps {
    exercise: ExerciseModel;
    onPress: (exercise: ExerciseModel) => void
}

export const Exercise: FunctionComponent<IProps> = ({exercise, onPress}) => {
    return (
        <TouchableHighlight onPress={e => onPress(exercise)}>
            <View style={styles.item}>
                <Image
                    style={{width: 81, height: 53}}
                    source={{uri: exercise.imagePath}}
                />
                <View style={styles.details}>
                    <Text style={{fontWeight: 'bold'}}>{exercise.name}!</Text>
                    <Text style={{color: '#9B9B9B'}}>Sets: {exercise.sets}</Text>
                    <Text style={{color: '#9B9B9B'}}>Last Performed: {new Date().toDateString()}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderWidth: 0.2,
        borderColor: '#d6d7da',
    },
    details: {
        marginLeft: 4
    }
});
