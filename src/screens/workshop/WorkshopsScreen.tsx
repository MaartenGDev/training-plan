import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {Exercise as ExerciseModel} from "../../models/Exercise";
import {GroupedList} from "../../components/GroupedList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {Workshop} from "../../components/Workshop";
import {Exercise} from "../../components/Exercise";

interface IProps {
    navigation: any
}

const GET_WORKSHOPS_QUERY = gql`
                    {
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
                `;

export default class WorkshopsScreen extends Component<IProps> {
    state = {
        searchQuery: ''
    };

    render() {
        const {searchQuery} = this.state
        const {navigation} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Search workshops'
                        onChangeText={(searchQuery) => this.setState({searchQuery})}
                        value={searchQuery}
                    />
                </View>

                <Query
                    query={GET_WORKSHOPS_QUERY}
                >
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;

                        const itemsByGroupName = data.workshops
                            .filter(e => searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(x => ({...x, items: x.exercises}));

                        return <GroupedList itemsByGroupName={itemsByGroupName}
                                            itemRenderer={item => <Exercise
                                                key={item.id}
                                                exercise={item}
                                                onPress={exercise => {
                                                    navigation.navigate('Exercise', {exercise})
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
