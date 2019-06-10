import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Exercise} from '../../components/Exercise';
import {GroupedActivityList} from "../../components/GroupedActivityList";
import {trainingSchedules} from "../../mock/data";

interface IProps {
    navigation: any
}

export default class TrainingSchedulesScreen extends Component<IProps> {
    state = {
        trainingSchedules: trainingSchedules
    };

    render() {
        const {navigation} = this.props;
        const {trainingSchedules} = this.state;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <GroupedActivityList exercisesByGroupName={trainingSchedules} onExercisePress={exercise => {
                    navigation.navigate('Exercise', {exercise: exercise, title: 'oef'})
                }}/>
            </SafeAreaView>
        );
    }
}
