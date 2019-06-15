import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {Workshop as WorkshopModel} from "../models/Workshop";
import listStyles from '../styles/Lists'

interface IProps {
    workshop: WorkshopModel;
    onPress: (workout: WorkshopModel) => void
}

export const Workshop: FunctionComponent<IProps> = ({workshop, onPress}) => {
    return (
        <TouchableHighlight onPress={e => onPress(workshop)}>
            <View style={listStyles.item}>
                <Text style={{fontWeight: 'bold'}}>{workshop.name}</Text>
                <Text style={{color: '#9B9B9B'}}>{workshop.exercises.length} Exercises</Text>
                <Text style={{color: '#9B9B9B'}}>Date: {new Date().toDateString()}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({

});
