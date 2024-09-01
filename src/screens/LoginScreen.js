import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

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
        <View>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Button title="Login as User" onPress={() => setRole('user')} />
            <Button title="Login as Professional" onPress={() => setRole('professional')} />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up as User" onPress={() => navigation.navigate('UserSignup')} />
            <Button title="Sign Up as Professional" onPress={() => navigation.navigate('ProfessionalSignup')} />
        </View>
    );
}
