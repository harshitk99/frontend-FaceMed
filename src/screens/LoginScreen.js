import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Button from '../components/Button';
import TextInput from '../components/InputField';

export default function LoginScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // default role

    const handleLogin = async () => {
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.');
            return;
        }
        try {
            const response = await axios.post('http://192.168.1.33:3000/login', { name, password, role });
            const { token } = response.data;
            if (role === 'user') {
                navigation.navigate('UserDashboard', { token });
            } else {
                navigation.navigate('ProfessionalDashboard', { token });
            }
        } catch (error) {
            Alert.alert('Login failed', error.response?.data || 'An error occurred');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Text style={styles.label}>Select Role:</Text>
            <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Professional" value="professional" />
            </Picker>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up as User" onPress={() => navigation.navigate('UserSignup')} />
            <Button title="Sign Up as Professional" onPress={() => navigation.navigate('ProfessionalSignup')} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
});