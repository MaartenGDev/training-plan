import React from 'react'
import {Component} from 'react'
import {StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-navigation'

export default class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => <Icon name="home" size={30} color={tintColor}/>,
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Hello Home!</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
