import React, {Component} from 'react';
import {DrawerItemsProps, NavigationActions, NavigationRoute} from 'react-navigation';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


interface IProps extends DrawerItemsProps {
    pagesByRouteKey: {
        [routeKey: string]: { icon: string, label: string }
    }
}

export class Sidebar extends Component<IProps> {
    navigateToScreen = (route) => (
        () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route
            });
            this.props.navigation.dispatch(navigateAction);
        });

    render() {
        const {items, activeItemKey, pagesByRouteKey} = this.props;
        const getTintColor = (item: NavigationRoute) => activeItemKey === item.key ? styles.selectedItem.color : '#000000';

        return (
            <View style={styles.container}>
                <View style={styles.screenContainer}>
                    {items.filter(x => pagesByRouteKey.hasOwnProperty(x.key))
                        .map(item => {
                            return <TouchableHighlight onPress={this.navigateToScreen(item.routeName)}>
                                <View
                                    key={item.key}
                                    style={[styles.item, (this.props.activeItemKey == item.key) ? styles.activeBackgroundColor : null]}>
                                    <Icon name={pagesByRouteKey[item.routeName].icon} size={30}
                                          color={getTintColor(item)}/>
                                    <Text
                                        style={[styles.itemText, (this.props.activeItemKey == item.key) ? styles.selectedItem : null]}>{pagesByRouteKey[item.routeName].label}</Text>
                                </View>
                            </TouchableHighlight>
                        })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    screenContainer: {
        width: '100%',
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    itemText: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: 'center'
    },
    selectedItem: {
        fontWeight: 'bold',
        color: '#9f7aea'
    },
    activeBackgroundColor: {
        backgroundColor: '#F2F3F7'
    }
});
