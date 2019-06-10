import React, {Component} from 'react';
import {View, SectionList, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Exercise} from "../../models/Exercise";
import {Dimensions} from 'react-native';
import {Workout} from "../../components/Workout";
import {Workshop} from "../../models/Workshop";

interface IProps {
    navigation: { state: { params: { exercise: Exercise } } },
    title: string,
}

export default class ExerciseScreen extends Component<IProps> {
    getTitleForWorkshop(workshop: Workshop): string {
        const words = workshop.name.split(' ');

        return words.map(word => word[0].toUpperCase()).join('');
    }

    render() {
        const {exercise} = this.props.navigation.state.params;
        const win = Dimensions.get('window');
        const imageSize = {
            width: 640,
            height: 420
        };

        const ratio = win.width / imageSize.width;

        return (
            <SafeAreaView style={{backgroundColor: '#F2F3F7', flexGrow: 1}}>
                <ScrollView>
                    <Image style={{width: win.width, height: imageSize.height * ratio}}
                           source={{uri: exercise.imagePath}}/>
                    <View style={{marginLeft: 15, marginRight: 15, marginTop: 15}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#606F7B'}}>{exercise.name}</Text>
                        <Text style={{color: '#4A4A4A'}}>{exercise.description}</Text>

                        <Text style={styles.heading}>Details</Text>
                        <View style={{marginTop: 4}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Last performed</Text>
                                <Text
                                    style={{
                                        marginLeft: 2,
                                        color: '#4A4A4A'
                                    }}>{exercise.lastPerformed.toDateString()}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: '#4A4A4A'}}>Count: </Text>
                                <Text style={{marginLeft: 2, color: '#4A4A4A'}}>22</Text>
                            </View>
                        </View>

                        <Text style={styles.heading}>Workshops</Text>
                        <View style={{flexDirection: 'row', marginTop: 4}}>
                            {exercise.usedInWorkshops.map(workshop => <View
                                key={workshop.id}
                                style={styles.tile}><Text style={{
                                color: '#ffffff',
                                fontWeight: 'bold'
                            }}>{this.getTitleForWorkshop(workshop)}</Text>
                            </View>)}
                        </View>

                        <Text style={styles.heading}>Workouts</Text>
                        <View style={styles.workouts}>{exercise.workouts.map(workout => <Workout key={workout.id}
                                                                                                 workout={workout}/>)}</View>
                    </View>
                </ScrollView>
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
    heading: {
        fontSize: 14,
        marginTop: 15,
        color: '#606F7B'
    },
    tile: {
        marginRight: 5,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4299E1'
    }
});
