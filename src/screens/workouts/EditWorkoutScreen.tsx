import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, FlatList, Picker} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import listStyles from '../../styles/Lists'
import textStyles from '../../styles/Text'
import {Exercise} from "../../components/Exercise";
import {WorkoutDto} from "../../models/WorkoutDto";
import inputStyles from "../../styles/Input";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {ExerciseDto} from "../../models/ExerciseDto";
import {WorkoutExerciseDto} from "../../models/WorkoutExerciseDto";
import {TrainingScheduleDto} from "../../models/TrainingScheduleDto";


interface IProps {
    navigation: { navigate: any, state: { params: { workout: WorkoutDto } } },
    title: string,
}


interface IState {
    searchQuery: string,
    exercisesForWorkout: WorkoutExerciseDto[]
}


const GET_WORKOUT_AND_EXERCISES_QUERY = gql`
query Workout($id: Int!) {
  workout(id: $id) {
    id
    exercises {
      id
      name
    }
  }
  exercises {
    id
    name
    imagePath
    category {
        name
    }
  }
  trainingSchedules {
    id
    name
  }
}
`;

export default class EditWorkoutScreen extends Component<IProps, IState> {
    state = {
        searchQuery: '',
        exercisesForWorkout: []
    };

    addExerciseToWorkout = (exercise: ExerciseDto) => {
        const workoutExerciseDto = new WorkoutExerciseDto({...exercise, dateTime: new Date().toDateString()});
        this.setState((prevState) => ({
            searchQuery: '',
            exercisesForWorkout: [workoutExerciseDto, ...prevState.exercisesForWorkout]
        }))
    };

    removeExerciseFromWorkout = (exercise: ExerciseDto) => {
        this.setState((prevState) => ({exercisesForWorkout: prevState.exercisesForWorkout.filter(e => e.id !== exercise.id)}))
    };

    render() {
        const {searchQuery, exercisesForWorkout} = this.state;
        const {navigation} = this.props;
        let {workout} = navigation.state.params;

        let trainingSchedules: TrainingScheduleDto[] = [];

        return (
            <SafeAreaView style={{backgroundColor: '#ffffff', flexGrow: 1}}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <Query
                        query={GET_WORKOUT_AND_EXERCISES_QUERY}
                        variables={{id: workout.id === undefined ? -1 : workout.id}}
                        fetchPolicy={"cache-first"}
                    >
                        {({loading, error, data}) => {
                            if (error) return <Text>Error :(</Text>;

                            if (!loading) {
                                workout = data.workout || new WorkoutDto();
                                trainingSchedules = data.trainingSchedules;
                            }

                            const exercises: ExerciseDto[] = (data.exercises || [])
                                .filter(e => searchQuery !== '' && e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .slice(0, 3);

                            return (<View style={styles.contentGroup}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#606F7B'}}>Create workout</Text>
                                <Text style={{...textStyles.heading, marginTop: 10}}>Based on workout</Text>
                                <View>
                                    <Picker
                                        selectedValue={'java'}
                                        onValueChange={(itemValue, itemIndex) => {
                                        }
                                        }>
                                        <Picker.Item key={0} label="None" value={0}/>
                                        {trainingSchedules.map(schedule => <Picker.Item key={schedule.id} label={schedule.name} value={schedule.id}/>)}
                                    </Picker>
                                </View>

                                <Text style={{...textStyles.heading, marginTop: 10}}>Add exercises</Text>
                                <TextInput
                                    style={{...inputStyles.searchInput, marginTop: 5}}
                                    placeholder='Search exercises'
                                    onChangeText={(searchQuery) => this.setState({searchQuery})}
                                    value={searchQuery}
                                />
                                <View style={{marginTop: 4}}>
                                    <FlatList
                                        data={exercises}
                                        keyboardShouldPersistTaps={'always'}
                                        renderItem={({item}) => <Exercise
                                            exercise={item}
                                            options={{showCategory: true, showCreateAction: true}}
                                            onPress={exercise => navigation.navigate('Exercise', {exercise})}
                                            onCreateAction={exercise => this.addExerciseToWorkout(exercise)}
                                        />}
                                        keyExtractor={(item) => item.id + ""}
                                    />
                                </View>

                                <Text style={textStyles.heading}>Exercises</Text>
                                <View style={{marginTop: 4}}>
                                    <FlatList
                                        data={exercisesForWorkout}
                                        keyboardShouldPersistTaps={'always'}
                                        renderItem={({item}) => <Exercise
                                            exercise={item}
                                            options={{showCategory: true, showDeleteAction: true}}
                                            onPress={exercise => navigation.navigate('Exercise', {exercise})}
                                            onDeleteAction={exercise => this.removeExerciseFromWorkout(exercise)}
                                        />}
                                        keyExtractor={(item) => item.id + ""}
                                    />
                                </View>
                            </View>)
                        }}
                    </Query>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    contentGroup: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }
});
