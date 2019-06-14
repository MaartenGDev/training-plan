import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Exercise} from '../../components/Exercise';
import {GroupedActivityList} from "../../components/GroupedActivityList";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import {Text} from "react-native";

interface IProps {
    navigation: any
}

export default class TrainingSchedulesScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <Query
                    query={gql`
                    {
                     trainingSchedules {
                        id
                        name
                        exercises {
                          id
                          imagePath
                          description
                          name
                          sets
                        }
                      }
                     }
                `}>
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;

                        return (
                            <GroupedActivityList exercisesByGroupName={data.trainingSchedules} onExercisePress={exercise => {
                                navigation.navigate('Exercise', {exercise: exercise, title: 'oef'})
                            }}/>)
                    }}
                </Query>
            </SafeAreaView>
        );
    }
}
