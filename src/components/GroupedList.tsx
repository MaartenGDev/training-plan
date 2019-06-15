import React, {Component, FunctionComponent} from 'react';
import {View, SectionList, StyleSheet, Text, Image, FlatList} from 'react-native';
import {Exercise} from "./Exercise";

interface IProps {
    itemsByGroupName: {
        id: number,
        name: string,
        items: any[],
    }[];
    itemRenderer: (item: any, group: {id: number, name: string}) => any
}

export const GroupedList: FunctionComponent<IProps> = ({itemsByGroupName, itemRenderer}) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginLeft: 15, marginRight: 15}}
            data={itemsByGroupName}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({item: group}) => <View style={styles.workout}>
                <Text style={styles.workoutHeader}>{group.name.toUpperCase()}</Text>
                {group.items.map(item => itemRenderer(item, group))}
            </View>}
            keyExtractor={(item) => item.id + ""}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    workout: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 15,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    workoutHeader: {
        paddingTop: 4,
        paddingBottom: 4
    }
});
