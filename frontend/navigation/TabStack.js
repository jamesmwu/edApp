import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuizScreen from "../screens/QuizScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import LessonScreen from "../screens/LessonScreen";
import { COLORS } from '../styles/global';

function Tabs() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: COLORS.white,
            tabBarInactiveTintColor: COLORS.accent,
            tabBarStyle: { backgroundColor: COLORS.primary },
            tabBarShowLabel: false
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="leaderboard" color={color} size={size} />
                ),
                headerShown: false,
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    );
}

export default function TabStack() {
    const Stack = createNativeStackNavigator();

    //Function to make screen slide downwards on navigation
    const slideDownTransition = {
        gestureDirection: 'vertical',
        transitionSpec: {
            open: { animation: 'timing', config: { duration: 500 } },
            close: { animation: 'timing', config: { duration: 500 } },
        },
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateY: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-layouts.screen.height, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };

    const screenOptions = {
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
    };

    const quizScreenOptions = {
        ...screenOptions,
        ...slideDownTransition,
    };

    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Quiz" component={QuizScreen} options={quizScreenOptions} />
            <Stack.Screen name="Lesson" component={LessonScreen} />
        </Stack.Navigator>
    );
}
