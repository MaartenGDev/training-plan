import React, {FunctionComponent} from 'react';
import {View, SectionList, StyleSheet, Text} from 'react-native';
import {Activity as ActivityModel} from "../models/Activity";

interface IProps {
    activity: ActivityModel;
}

export const Activity: FunctionComponent<IProps> = ({activity, children}) => {
    return (
        <View>
            <Text>{activity.name}!</Text>
        </View>
    );
};
