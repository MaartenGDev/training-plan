import React from 'react'
import {Component} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {Workout} from "../../components/Workout";
import {Exercise} from "../../components/Exercise";
import {exercises, workouts} from '../../mock/data'

export default class HomeScreen extends Component {
    state = {
        workouts: workouts.slice(0, 3),
        upcomingExercises: exercises.slice(0, 4)
    };

    render() {
        const {workouts, upcomingExercises} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.contentGroup}>
                    <Text style={styles.greeting}>Welcome back, Maarten!</Text>

                    <Text style={styles.heading}>Latest workouts</Text>
                    <View style={styles.workouts}>
                        {workouts.map(workout => <Workout key={workout.id} workout={workout}/>)}
                    </View>

                    <Text style={{...styles.heading, marginTop: 20}}>Upcoming lessons</Text>
                    <View style={styles.exercises}>
                        {upcomingExercises.map(exercise => <Exercise key={exercise.id} exercise={exercise}
                                                                     onPress={x => {
                                                                     }}/>)}
                    </View>
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
    exercises: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 4,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workouts: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 4,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contentGroup: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }
});
