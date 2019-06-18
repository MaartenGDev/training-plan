import React, {FunctionComponent} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import listStyles from '../styles/Lists'
import {JourneyDto} from "../models/JourneyDto";

interface IProps {
    journey: JourneyDto;
    onPress: (workout: JourneyDto) => void
}

export const Journey: FunctionComponent<IProps> = ({journey, onPress}) => {
    return (
        <TouchableHighlight onPress={e => onPress(journey)}>
            <View style={listStyles.item}>
                <Text style={{fontWeight: 'bold'}}>{journey.name}</Text>
                <Text style={{color: '#9B9B9B'}}>{journey.workshops.length} Workshops</Text>
            </View>
        </TouchableHighlight>
    );
};
