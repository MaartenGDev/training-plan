import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {Exercise} from "../../models/Exercise";
import {GroupedList} from "../../components/GroupedList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {Workout as WorkoutModel} from "../../models/Workout";
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

const styles = StyleSheet.create({
    searchWrapper: {
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    searchInput: {
        backgroundColor: '#F2F3F7',
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
});
