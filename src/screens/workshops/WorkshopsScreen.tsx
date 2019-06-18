import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {GroupedList} from "../../components/GroupedList";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {Exercise} from "../../components/Exercise";
import inputStyles from '../../styles/Input'
import {JourneyDto} from "../../models/JourneyDto";

interface IProps {
    navigation: { navigate: any, state: { params: { journey: JourneyDto} } }
}

const GET_WORKSHOPS_QUERY = gql`
query WorkshopsForJourney($id: Int!) {
  journey(id: $id) {
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
}
`;

export default class WorkshopsScreen extends Component<IProps> {
    state = {
        searchQuery: ''
    };

    render() {
        const {searchQuery} = this.state
        const {navigation} = this.props;
        const {journey} = navigation.state.params;

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
                    variables={{id: journey.id}}
                >
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;


                        const itemsByGroupName = data.journey.workshops
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
