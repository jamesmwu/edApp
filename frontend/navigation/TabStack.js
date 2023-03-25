import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';

export default function TabStack() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}