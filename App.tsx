import React from 'react'
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/home/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExercisesScreen from "./src/screens/exercises/ExercisesScreen";
import ExerciseScreen from "./src/screens/exercises/ExerciseScreen";
import TrainingSchedulesScreen from "./src/screens/training-schedules/TrainingSchedulesScreen";
import {Sidebar} from "./src/screens/navigation/Sidebar";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

const link = createHttpLink({
    uri: "https://training-plan-api.maartendev.me/graphql"
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => <Icon name="home" size={30} color={tintColor}/>,
        })
    },
    TrainingSchedules: {
        screen: TrainingSchedulesScreen,
        displayName: "test",
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Training Schedules',
            drawerIcon: ({tintColor}) => <Icon name="whatshot" size={30} color={tintColor}/>,
        })
    },
    Exercises: {
        screen: ExercisesScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Exercises',
            drawerIcon: ({tintColor}) => <Icon name="hourglass-empty" size={30} color={tintColor}/>
        })
    },
    Exercise: {
        screen: ExerciseScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: () => null,
        })
    },
}, {
    contentComponent: props => <Sidebar {...props} pagesByRouteKey={{
        Home: {
            label: 'Home',
            icon: 'home'
        },
        TrainingSchedules: {
            label: 'Training Schedules',
            icon: 'whatshot'
        },
        Exercises: {
            label: 'Exercises',
            icon: 'hourglass-empty'
        }
    }}/>
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

const NavContainer = createAppContainer(StackNavigation);

const App = () => (
    <ApolloProvider client={client}>
        <NavContainer />
    </ApolloProvider>
);


export default App;
