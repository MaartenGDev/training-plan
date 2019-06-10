import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Exercise} from "../../models/Exercise";
import {GroupedActivityList} from "../../components/GroupedActivityList";

interface IProps {
    navigation: any
}
export default class ExercisesScreen extends Component<IProps> {
    state = {
        exercises: [
            {
                id: 1,
                name: 'Arms',
                exercises: [
                    new Exercise(1, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/105.jpg', '12-12-15', new Date(), [], []),
                    new Exercise(2, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/104.jpg', '12-12-15', new Date(), [], []),
                    new Exercise(4, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/104.jpg', '12-12-15', new Date(), [], []),
                ]
            },
            {
                id: 2,
                name: 'Legs',
                exercises: [
                    new Exercise(3, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/105.jpg', '12-12-15', new Date(), [], []),
                    new Exercise(6, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/104.jpg', '12-12-15', new Date(), [], []),
                ]
            },
            {
                id: 3,
                name: 'Bicep',
                exercises: [
                    new Exercise(5, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/105.jpg', '12-12-15', new Date(), [], []),
                ]
            },
            {
                id: 4,
                name: 'Core',
                exercises: [
                    new Exercise(7, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/105.jpg', '12-12-15', new Date(), [], []),
                    new Exercise(8, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/104.jpg', '12-12-15', new Date(), [], []),
                    new Exercise(9, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/105.jpg', '12-12-15', new Date(), [], []),
                    new Exercise(10, 'Lower back', 'oef', 'https://s3-eu-west-1.amazonaws.com/training-plan.maartendev.me/assets/104.jpg', '12-12-15', new Date(), [], []),
                ]
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
