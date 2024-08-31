import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function ProfessionalSignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [hospital, setHospital] = useState('');
    const [doctorID, setDoctorID] = useState('');

    const handleSignup = async () => {
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('Contact', contact);
        formData.append('Doctor ID', doctorID);
        formData.append('hospital', hospital);


        try {
            await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            <TextInput placeholder="Affiliated hospital" value={hospital} onChangeText={setHospital} />
            <TextInput placeholder="Contact" value={contact} onChangeText={setContact} />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
}
