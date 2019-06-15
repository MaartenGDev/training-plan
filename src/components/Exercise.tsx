import React, {Component, FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {Exercise as ExerciseModel} from "../models/Exercise";

interface IProps {
    exercise: ExerciseModel;
    onPress: (exercise: ExerciseModel) => any,
    options?: {showLastPerformed?: boolean, showCategory?: boolean, showSets?: boolean}
}

export const Exercise: FunctionComponent<IProps> = ({exercise, onPress, options = {showLastPerformed: false, showCategory: false, showSets: false}}) => {
    return (
        <TouchableHighlight onPress={e => onPress(exercise)}>
            <View style={styles.item}>
                <Image
                    style={{width: 81, height: 53}}
                    source={{uri: exercise.imagePath}}
                />
                <View style={styles.details}>
                    <Text style={{fontWeight: 'bold'}}>{exercise.name}</Text>
                    {options.showSets && <Text style={{color: '#9B9B9B'}}>Sets: {exercise.sets}</Text>}
                    {options.showLastPerformed && <Text style={{color: '#9B9B9B'}}>Last Performed: {new Date().toDateString()}</Text>}
                    {options.showCategory && <Text style={{color: '#9B9B9B'}}>Category: {exercise.category.name}</Text>}
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
