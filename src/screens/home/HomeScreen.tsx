import React from 'react'
import {Component} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {Workout} from "../../components/Workout";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import {Workshop} from "../../components/Workshop";
import listStyles from '../../styles/Lists'

interface IProps {
    navigation: any
}

export default class HomeScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.contentGroup}>
                    <Text style={styles.greeting}>Welcome back, Maarten!</Text>
                    <Query
                        query={gql`
                    {
                    workouts {
                        id
                         exercises {
                          id
                          name
                          sets
                          imagePath
                          description
                          dateTime
                          category {
                            id
                            name
                          }
                        }
                      }
                      workshops {
                        id
                        name
                        exercises {
                          id
                          name
                          imagePath
                          description
                        }
                      }
                     }
                `}>
                        {({loading, error, data}) => {
                            if (loading) return <Text>Loading...</Text>;
                            if (error) return <Text>Error :(</Text>;

                            return (
                                <View>

                                    <Text style={styles.heading}>Latest workouts</Text>
                                    <View style={listStyles.wrapper}>
                                        {data.workouts.slice(0, 5).map(workout => <Workout
                                            key={workout.id}
                                            workout={workout}
                                            onPress={clickedWorkout =>
                                                navigation.navigate('Workout', {workout: clickedWorkout})
                                            }/>)}
                                    </View>

                                    <Text style={{...styles.heading, marginTop: 20}}>Upcoming workshops</Text>
                                    <View style={listStyles.wrapper}>
                                        {data.workshops.map(workshop => <Workshop
                                            key={workshop.id} workshop={workshop}
                                            onPress={clickedWorkshop =>
                                                navigation.navigate('Workshop', {workshop: clickedWorkshop})
                                            }/>)}
                                    </View>
                                </View>
                            )
                        }}
                    </Query>
                </ScrollView>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F2F3F7'
    },
    greeting: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#4a5568'
    },
    heading: {
        fontSize: 14,
        marginTop: 15,
        color: '#606F7B'
    },
    contentGroup: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }
});
