import React, {Component} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {ExerciseDto as ExerciseModel} from "../../models/ExerciseDto";
import {GroupedList} from "../../components/GroupedList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {Exercise} from "../../components/Exercise";
import inputStyles from '../../styles/Input'

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
                <View style={inputStyles.searchWrapper}>
                    <TextInput
                        style={inputStyles.searchInput}
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

                        const exercisesByCategory = Object.values<{ id: number, name: string, items: ExerciseModel[] }>(data.exercises
                            .filter(e => searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .reduce((acc, exercise) => {
                                if (!acc.hasOwnProperty(exercise.category.id)) {
                                    acc[exercise.category.id] = {
                                        id: exercise.category.id,
                                        name: exercise.category.name,
                                        items: []
                                    };
                                }
                                acc[exercise.category.id].items = [...acc[exercise.category.id].items, exercise];
                                return acc;
                            }, {}));

                        return <GroupedList itemsByGroupName={exercisesByCategory}
                                            itemRenderer={(item) => <Exercise
                                                        key={item.id}
                                                        exercise={item}
                                                        options={{showLastPerformed: true}}
                                                        onPress={exercise => {
                                                            navigation.navigate('Exercise', {exercise})
                                                        }}/>}/>
                    }}
                </Query>
            </SafeAreaView>

        );
    }
}
