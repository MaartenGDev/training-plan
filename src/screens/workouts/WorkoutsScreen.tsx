import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {GroupedList} from "../../components/GroupedList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {WorkoutDto as WorkoutModel} from "../../models/WorkoutDto";
import {Workout} from "../../components/Workout";
import {DateHelper} from "../../helpers/DateHelper";

interface IProps {
    navigation: any
}

const GET_WORKOUTS_QUERY = gql`
                    {
                     workouts {
                        id
                         exercises {
                          id
                          name
                          sets
                          category {
                            id
                            name
                          }
                          imagePath
                          description
                          dateTime
                        }
                      }
                     }
                `;

export default class WorkoutsScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <Query
                    query={GET_WORKOUTS_QUERY}
                >
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;

                        const workouts: WorkoutModel[] = data.workouts;

                        const workoutsByDate = Object.values<{ id: number, name: string, items: WorkoutModel[] }>(workouts
                            .reduce((acc, workout) => {
                                const date = DateHelper.format(new Date(workout.exercises[0].dateTime));

                                if (!acc.hasOwnProperty(date)) {
                                    acc[date] = {
                                        id: date,
                                        name: date,
                                        items: []
                                    };
                                }
                                acc[date].items = [...acc[date].items, workout];
                                return acc;
                            }, {}));


                        return <GroupedList itemsByGroupName={workoutsByDate}
                                            itemRenderer={(item, group) => <Workout
                                                key={`${item.id}${group.id}`}
                                                workout={item}
                                                onPress={workout => {
                                                    navigation.navigate('Workout', {workout})
                                                }}/>}/>
                    }}
                </Query>
            </SafeAreaView>

        );
    }
}
