import React from 'react'
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/home/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExercisesScreen from "./src/screens/exercises/ExercisesScreen";
import ExerciseScreen from "./src/screens/exercises/ExerciseScreen";
import TrainingSchedulesScreen from "./src/screens/training-schedules/TrainingSchedulesScreen";
import {Sidebar} from "./src/screens/navigation/Sidebar";
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache, defaultDataIdFromObject} from "apollo-cache-inmemory";
import WorkoutScreen from "./src/screens/workouts/WorkoutScreen";
import WorkoutsScreen from "./src/screens/workouts/WorkoutsScreen";
import WorkshopsScreen from "./src/screens/workshops/WorkshopsScreen";
import WorkshopScreen from "./src/screens/workshops/WorkshopScreen";
import JourneysScreen from "./src/screens/journeys/JourneysScreen";
import EditWorkoutScreen from "./src/screens/workouts/EditWorkoutScreen";

const link = createHttpLink({
    uri: "https://training-plan-api.maartendev.me/graphql"
});

const client = new ApolloClient({
    cache: new InMemoryCache({
        dataIdFromObject: (object: any) => {
            if (object.__typename === 'WorkoutExerciseType') {
                return object.id + '' + (object.dateTime || '');
            }

            return defaultDataIdFromObject(object);
        }
    }),
    link,
});

const pagesByRouteKey = {
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
    },
    Journeys: {
        label: 'Journeys',
        icon: 'school'
    }
};

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    Workouts: {
        screen: WorkoutsScreen,
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
    Journeys: {
        screen: JourneysScreen
    },
    Workshops: {
        screen: WorkshopsScreen
    },
    Workshop: {
        screen: WorkshopScreen
    },
    EditWorkout: {
        screen: EditWorkoutScreen
    },
}, {
    contentComponent: props => <Sidebar {...props} pagesByRouteKey={pagesByRouteKey}/>
});

DrawerNavigator.navigationOptions = ({ navigation }) => {
    const { key, routeName } = navigation.state.routes[navigation.state.index];

    return {
        headerTitle: pagesByRouteKey.hasOwnProperty(key)
            ? pagesByRouteKey[key].label
            : routeName
    };
};

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
        <NavContainer/>
    </ApolloProvider>
);


export default App;
