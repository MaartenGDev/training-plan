import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableHighlight} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Exercise} from "../../models/Exercise";
import {Dimensions} from 'react-native';
import {Workout} from "../../components/Workout";
import {Workshop} from "../../models/Workshop";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import textStyles from '../../styles/Text'

interface IProps {
    navigation: { navigate: any, state: { params: { exercise: Exercise } } },
    title: string,
}

const GET_EXERCISE_QUERY = gql`
 query Exercise($id: Int!) {
  exercise(id: $id) {
    id
    name
    imagePath
    description
    category {
      id
      name
    }
    workouts {
      id
      exercises {
        id
        name
        dateTime
        imagePath
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
        category {
            id
            name
      }
      }
    }
  }
}
`;

export default class ExerciseScreen extends Component<IProps> {
    getTitleForWorkshop(workshop: Workshop): string {
        const words = workshop.name.split(' ');

        return words.map(word => word[0].toUpperCase()).join('');
    }

    render() {
        const {navigation} = this.props;
        let {exercise} = navigation.state.params;
        const win = Dimensions.get('window');
        const imageSize = {
            width: 640,
            height: 420
        };

        const ratio = win.width / imageSize.width;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <Query
                    query={GET_EXERCISE_QUERY}
                    variables={{id: exercise.id}}
                >
                    {({loading, error, data}) => {
                        if (error) return <Text>Error :(</Text>;

                        if (!loading) {
                            exercise = data.exercise;
                        }

                        return (
                            <ScrollView>
                                <Image style={{width: win.width, height: imageSize.height * ratio}}
                                       source={{uri: exercise.imagePath}}/>
                                <View style={styles.contentGroup}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: '#606F7B'
                                    }}>{exercise.name}</Text>
                                    <Text style={{color: '#4A4A4A'}}>{exercise.description}</Text>

                                    <Text style={textStyles.heading}>Details</Text>
                                    <View style={{marginTop: 4}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Last performed</Text>
                                            <Text
                                                style={{
                                                    marginLeft: 2,
                                                    color: '#4A4A4A'
                                                }}>{new Date().toDateString()}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Count: </Text>
                                            <Text style={{marginLeft: 2, color: '#4A4A4A'}}>22</Text>
                                        </View>
                                    </View>

                                    {(exercise.workshops || []).length > 0 && (<View>
                                        <Text style={textStyles.heading}>Workshops</Text>
                                        <View style={{flexDirection: 'row', marginTop: 4}}>
                                            {(exercise.workshops || []).map(workshop => (<TouchableHighlight
                                                key={workshop.id}
                                                onPress={e => navigation.navigate('Workshop', {workshop})}>
                                                <View
                                                    style={styles.tile}><Text style={{
                                                    color: '#ffffff',
                                                    fontWeight: 'bold'
                                                }}>{this.getTitleForWorkshop(workshop)}</Text>
                                                </View>
                                            </TouchableHighlight>))}
                                        </View>
                                    </View>)}

                                    {(exercise.workouts || []).length > 0 && (<View>
                                        <Text style={textStyles.heading}>Workouts</Text>
                                        <View style={styles.workouts}>{(exercise.workouts || []).map(workout => <Workout
                                            key={workout.id}
                                            workout={workout}
                                            onPress={clickedWorkout =>
                                                navigation.navigate('Workout', {workout: clickedWorkout})
                                            }
                                        />)}</View>
                                    </View>)}
                                </View>
                            </ScrollView>)
                    }}
                </Query>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
    tile: {
        marginRight: 5,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4299E1'
    },
    contentGroup: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }
});
