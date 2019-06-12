import React, {Component} from 'react';
import {Text} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {Exercise} from "../../models/Exercise";
import {GroupedActivityList} from "../../components/GroupedActivityList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";

interface IProps {
    navigation: any
}

export default class ExercisesScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <Query
                    query={gql`
                    {
                     exercises {
                        id
                        name
                        imagePath
                        description
                        category {
                          id
                          name
                        }
                      }
                     }
                `}>
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;

                        const exercisesByCategory = Object.values<{id: number, name: string, exercises: Exercise[]}>(data.exercises.reduce((acc, exercise) => {
                            if (!acc.hasOwnProperty(exercise.category.id)) {
                                acc[exercise.category.id] = {
                                    id: exercise.category.id,
                                    name: exercise.category.name,
                                    exercises: []
                                };
                            }
                            acc[exercise.category.id].exercises = [...acc[exercise.category.id].exercises, exercise];
                            return acc;
                        }, {}));

                        return <GroupedActivityList exercisesByGroupName={exercisesByCategory}
                                                    onExercisePress={exercise => {
                                                        navigation.navigate('Exercise', {exercise})
                                                    }}/>
                    }}
                </Query>
            </SafeAreaView>

        );
    }
}
