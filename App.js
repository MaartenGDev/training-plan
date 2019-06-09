import React from 'react'
import { createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from './src/screens/home/HomeScreen'
import LessonList from './src/screens/lesson/LessonList'
import Icon from 'react-native-vector-icons/MaterialIcons';

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Lessons: {
    screen: LessonList,
  }
})
const StackNavigation = createStackNavigator({
  drawer: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <Icon name="menu" size={30} color="#000000" onPress={() => navigation.toggleDrawer()} style={{marginLeft: 10}}/>,
    })
  },
})

export default createAppContainer(StackNavigation)
