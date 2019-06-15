import React, {Component} from 'react';
import {View, SectionList, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Workshop as WorkshopModel} from '../../models/Workshop'
import {Exercise} from "../../components/Exercise";
import textStyles from '../../styles/Text'

interface IProps {
    navigation: { push: any, state: { params: { workshop: WorkshopModel } } },
    title: string,
}

export default class WorkshopScreen extends Component<IProps> {
    render() {
        const {navigation} = this.props;
        const {workshop} = navigation.state.params;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <ScrollView>
                    <View style={styles.contentGroup}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#606F7B'}}>{workshop.name}</Text>

                        <Text style={textStyles.heading}>Details</Text>
                        <View style={{marginTop: 4}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Date: </Text>
                                <Text
                                    style={{
                                        marginLeft: 2,
                                        color: '#4A4A4A'
                                    }}>{new Date().toDateString()}</Text>
                            </View>
                            {workshop.exercises.length > 0 && (<View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Exercises: </Text>
                                <Text style={{marginLeft: 2, color: '#4A4A4A'}}>{(workshop.exercises || []).length}</Text>
                            </View>)}
                        </View>

                        {workshop.exercises.length > 0 && <View>
                          <Text style={textStyles.heading}>Exercises</Text>
                          <View style={{marginTop: 4}}>
                              {workshop.exercises.map(exercise => <Exercise key={exercise.id} exercise={exercise}
                                                                            onPress={clickedExercise => navigation.push('Exercise', {exercise: clickedExercise})}/>)}
                          </View>
                        </View>}
                    </View>
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
