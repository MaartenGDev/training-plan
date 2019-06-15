import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {Exercise} from '../../components/Exercise';
import {GroupedList} from "../../components/GroupedList";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import {Text} from "react-native";

interface IProps {
    navigation: any
}

export default class TrainingSchedulesScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <Query
                    query={gql`
                   {
  trainingSchedules {
    id
    name
    exercises {
      id
      imagePath
      description
      name
      sets
      category {
        id
        name
      }
    }
  }
}

                `}>
                    {({loading, error, data}) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>Error :(</Text>;

                        const itemsByGroupName = data.trainingSchedules.map(x => ({...x, items: x.exercises}));

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
