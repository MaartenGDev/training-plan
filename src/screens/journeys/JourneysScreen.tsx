import React, {Component} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import inputStyles from '../../styles/Input'
import {Journey} from "../../components/Journey";
import {JourneyDto} from "../../models/JourneyDto";
import layoutStyles from '../../styles/Layout'
import listStyles from '../../styles/Lists'


interface IProps {
    navigation: any
}

const GET_JOURNEYS_QUERY = gql`
  {
  journeys {
    id
    name
    workshops {
      id
      name
    }
  }
}
`;

export default class JourneysScreen extends Component<IProps> {
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
                        placeholder='Search journeys'
                        onChangeText={(searchQuery) => this.setState({searchQuery})}
                        value={searchQuery}
                    />
                </View>

                <View style={layoutStyles.contentGroup}>
                    <View style={listStyles.wrapper}>
                        <Query
                            query={GET_JOURNEYS_QUERY}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <Text>Loading...</Text>;
                                if (error) return <Text>Error :(</Text>;

                                const journeys: JourneyDto[] = data.journeys
                                    .filter(e => searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(x => ({...x, key: x.id}))

                                return <FlatList
                                    data={journeys}
                                    renderItem={({item}) => <Journey journey={item}
                                                                     onPress={journey => navigation.navigate('Workshops', {journey})}/>}
                                    keyExtractor={(item) => item.id + ""}
                                />;
                            }}
                        </Query>
                    </View>
                </View>
            </SafeAreaView>

        );
    }
}
