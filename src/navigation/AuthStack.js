import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import UserSignupScreen from '../screens/UserSignupScreen';
import ProfessionalSignupScreen from '../screens/ProfessionalSignupScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="UserSignup" component={UserSignupScreen} />
            <Stack.Screen name="ProfessionalSignup" component={ProfessionalSignupScreen} />
        </Stack.Navigator>
    );
}

export default AuthStack;
