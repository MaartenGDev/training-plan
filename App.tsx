import React from 'react'
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/home/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WorkoutScreen from './src/screens/workout/WorkoutScreen';

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Workouts: {
    screen: WorkoutScreen
  }
});
const StackNavigation = createStackNavigator({
  drawer: {
    screen: DrawerNavigator,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: <Icon name="menu" size={30} color="#000000" onPress={() => navigation.toggleDrawer()}
                        style={{marginLeft: 10}}/>,
    })
  },
});

export default createAppContainer(StackNavigation);
