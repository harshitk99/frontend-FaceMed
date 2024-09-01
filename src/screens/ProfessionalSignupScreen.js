import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import Button from '../components/Button';
import TextInput from '../components/InputField';

export default function ProfessionalSignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [affiliatedHospital, setAffiliatedHospital] = useState('');
    const [doctorID, setDoctorID] = useState('');

    const handleSignup = async () => {
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.');
            return;
        }

        const data = {
            name,
            password,
            contact,
            doctorId: doctorID,
            affiliatedHospital,
        };

        try {
            await axios.post('http://192.168.1.33:3000/register-professional', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('Signup successful');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Signup failed', error.response?.data || 'An error occurred');
        }
    };

    return (
        <View>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <TextInput placeholder="Doctor ID" value={doctorID} onChangeText={setDoctorID} />
            <TextInput placeholder="Affiliated hospital" value={affiliatedHospital} onChangeText={setAffiliatedHospital} />
            <TextInput placeholder="Contact" value={contact} onChangeText={setContact} />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
}
