import React, {FunctionComponent} from 'react';
import {View, SectionList, StyleSheet, Text, Image, FlatList} from 'react-native';
import {Exercise as ExerciseModel} from "../models/Exercise";
import {Exercise} from "./Exercise";

interface IProps {
    exercisesByGroupName: {
        id: number,
        name: string,
        exercises: ExerciseModel[],
    }[];
    onExercisePress: (exercise: ExerciseModel) => void
}

export const GroupedActivityList: FunctionComponent<IProps> = ({exercisesByGroupName, onExercisePress}) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginLeft: 15, marginRight: 15}}
            data={exercisesByGroupName}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({item}) => <View style={styles.workout}>
                <Text style={styles.workoutHeader}>{item.name.toUpperCase()}</Text>
                {item.exercises.map(activity => <Exercise key={activity.id} exercise={activity} onPress={onExercisePress}/>)}
            </View>}
            keyExtractor={(item) => item.id + ""}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    workout: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 15,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workoutHeader: {
        paddingTop: 4,
        paddingBottom: 4
    }
});
