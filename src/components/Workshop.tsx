import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
import {Workshop as WorkshopModel} from "../models/Workshop";

interface IProps {
    workshop: WorkshopModel;
    onPress: (workout: WorkshopModel) => void
}

export const Workshop: FunctionComponent<IProps> = ({workshop, onPress}) => {
    return (
        <TouchableHighlight onPress={e => onPress(workshop)}>
            <View style={styles.item}>
                <Text style={{fontWeight: 'bold'}}>{workshop.name}</Text>
                <Text style={{color: '#9B9B9B'}}>{workshop.exercises.length} Exercises</Text>
                <Text style={{color: '#9B9B9B'}}>Date: {new Date().toDateString()}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderWidth: 0.2,
        borderColor: '#d6d7da',
        color: 'red'
    }
});
