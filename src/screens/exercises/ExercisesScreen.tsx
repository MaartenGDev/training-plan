import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {Exercise} from "../../models/Exercise";
import {GroupedActivityList} from "../../components/GroupedActivityList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";

interface IProps {
    navigation: any
}

const GET_EXERCISES_QUERY = gql`
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
                `;

export default class ExercisesScreen extends Component<IProps> {
    state = {
        searchQuery: ''
    };

    render() {
        const {searchQuery} = this.state;
        const {navigation} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Search exercises'
                        onChangeText={(searchQuery) => this.setState({searchQuery})}
                        value={searchQuery}
                    />
                </View>
                <Query
                    query={GET_EXERCISES_QUERY}
                    fetchPolicy={"cache-first"}
                >
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;

                        const exercisesByCategory = Object.values<{ id: number, name: string, exercises: Exercise[] }>(data.exercises
                            .filter(e => searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .reduce((acc, exercise) => {
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
