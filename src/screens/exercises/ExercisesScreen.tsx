import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Exercise} from "../../models/Exercise";
import {GroupedActivityList} from "../../components/GroupedActivityList";
import {exercises} from "../../mock/data";

interface IProps {
    navigation: any
}
export default class ExercisesScreen extends Component<IProps> {
    state = {
        exercises: [
            {
                id: 1,
                name: 'Arms',
                exercises: exercises.slice(0, 2)
            },
            {
                id: 2,
                name: 'Legs',
                exercises:  exercises.slice(2, 5)
            },
            {
                id: 3,
                name: 'Bicep',
                exercises: exercises.slice(5, 7)
            },
            {
                id: 4,
                name: 'Core',
                exercises: exercises.slice(7, 10)
            }
        ]
    };

    render() {
        const {navigation} = this.props;
        const {exercises} = this.state;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7',  flexGrow: 1}}>
                <GroupedActivityList exercisesByGroupName={exercises} onExercisePress={exercise => {
                    navigation.navigate('Exercise', {exercise})
                }}/>
            </SafeAreaView>
        );
    }
}
