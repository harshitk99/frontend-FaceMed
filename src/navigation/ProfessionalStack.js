import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfessionalDashboardScreen from '../screens/ProfessionalDashboardScreen';
import CameraComponent from '../components/CameraComponent';
import UserDataScreen from './screens/UserDataScreen';

const Stack = createNativeStackNavigator();

function ProfessionalStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfessionalDashboard" component={ProfessionalDashboardScreen} />
            <Stack.Screen name="Camera" component={CameraComponent} />
            <Stack.Screen name="UserData" component={UserDataScreen} />
        </Stack.Navigator>
    );
}

export default ProfessionalStack;
