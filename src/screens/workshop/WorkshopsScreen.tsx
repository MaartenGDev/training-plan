import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {GroupedList} from "../../components/GroupedList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {Exercise} from "../../components/Exercise";
import inputStyles from '../../styles/Input'

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
                          category {
                            id
                            name
                          }
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
                <View style={inputStyles.searchWrapper}>
                    <TextInput
                        style={inputStyles.searchInput}
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
