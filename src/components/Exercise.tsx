import React, {Component, FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {ExerciseDto as ExerciseModel} from "../models/ExerciseDto";

interface IProps {
    exercise: ExerciseModel;
    onPress: (exercise: ExerciseModel) => any,
    onCreateAction?: (exercise: ExerciseModel) => any,
    onDeleteAction?: (exercise: ExerciseModel) => any,
    options?: { showLastPerformed?: boolean, showCategory?: boolean, showSets?: boolean, showCreateAction?: boolean, showDeleteAction?: boolean }
}

export const Exercise: FunctionComponent<IProps> = ({
                                                        exercise, onPress,
                                                        options = {
                                                            showLastPerformed: false,
                                                            showCategory: false,
                                                            showSets: false,
                                                            showCreateAction: false,
                                                            showDeleteAction: false,
                                                        },
                                                        onCreateAction = () => {
                                                        },
                                                        onDeleteAction = () => {
                                                        }
                                                    }) => {
    return (
        <TouchableHighlight onPress={e => onPress(exercise)}>
            <View style={styles.item}>
                <Image
                    style={{width: 81, height: 53}}
                    source={{uri: exercise.imagePath}}
                />
                <View style={{justifyContent: "space-between", flexDirection: "row", flex: 1}}>
                    <View style={styles.details}>
                        <Text style={{fontWeight: 'bold', flexWrap: "wrap"}}>{exercise.name}</Text>
                        {options.showCategory &&
                        <Text style={{color: '#9B9B9B'}}>Category: {exercise.category.name}</Text>}
                        {options.showSets && <Text style={{color: '#9B9B9B'}}>Sets: {exercise.sets}</Text>}
                        {options.showLastPerformed &&
                        <Text style={{color: '#9B9B9B'}}>Last Performed: {new Date().toDateString()}</Text>}
                    </View>

                    {options.showCreateAction &&
                    <View style={styles.container}>
                      <TouchableHighlight onPress={e => onCreateAction(exercise)}
                                          style={{...styles.actionButton, backgroundColor: "rgb(195, 125, 198)"}}>
                        <Text style={{color: "#ffffff", fontWeight: "bold"}}>+</Text>
                      </TouchableHighlight>
                    </View>}

                    {options.showDeleteAction &&
                    <View style={styles.container}>
                      <TouchableHighlight onPress={e => onDeleteAction(exercise)} style={{...styles.actionButton, backgroundColor: "red"}}>
                        <Text style={{color: "#ffffff", fontWeight: "bold"}}>-</Text>
                      </TouchableHighlight>
                    </View>}
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
        marginLeft: 4,
    },
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 30,
        width: 30,
        borderRadius: 60,
    }
});
