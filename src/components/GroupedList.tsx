import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image, FlatList} from 'react-native';
import listStyles from './../styles/Lists';

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
            data={itemsByGroupName}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({item: group}) => <View style={listStyles.wrapper}>
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
    workoutHeader: {
        paddingTop: 4,
        paddingBottom: 4
    }
});
