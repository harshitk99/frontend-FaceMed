import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';  // Implement this screen for updating user data

const Stack = createNativeStackNavigator();

function UserStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
            <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
        </Stack.Navigator>
    );
}

export default UserStack;
