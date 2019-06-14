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
import WorkoutScreen from "./src/screens/workouts/WorkoutScreen";
import WorkoutsScreen from "./src/screens/workouts/WorkoutsScreen";

const link = createHttpLink({
    uri: "https://training-plan-api.maartendev.me/graphql"
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    TrainingSchedules: {
        screen: TrainingSchedulesScreen,
    },
    Exercises: {
        screen: ExercisesScreen
    },
    Exercise: {
        screen: ExerciseScreen
    },
    Workout: {
        screen: WorkoutScreen
    },
    Workouts: {
        screen: WorkoutsScreen
    },
}, {
    contentComponent: props => <Sidebar {...props} pagesByRouteKey={{
        Home: {
            label: 'Home',
            icon: 'home'
        },
        TrainingSchedules: {
            label: 'Training Schedules',
            icon: 'assignment'
        },
        Exercises: {
            label: 'Exercises',
            icon: 'hourglass-empty'
        },
        Workouts: {
            label: 'Workouts',
            icon: 'whatshot'
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
