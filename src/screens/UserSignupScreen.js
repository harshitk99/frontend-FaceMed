import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function UserSignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [allergies, setAllergies] = useState('');
    const [pastSurgery, setPastSurgery] = useState('');
    const [otherMedicalConditions, setOtherMedicalConditions] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSignup = async () => {
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('emergencyContact', emergencyContact);
        formData.append('bloodGroup', bloodGroup);
        formData.append('allergies', allergies);
        formData.append('pastSurgery', pastSurgery);
        formData.append('otherMedicalConditions', otherMedicalConditions);
        formData.append('photo', {
            uri: photo.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

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
            <TextInput placeholder="Emergency Contact" value={emergencyContact} onChangeText={setEmergencyContact} />
            <TextInput placeholder="Blood Group" value={bloodGroup} onChangeText={setBloodGroup} />
            <TextInput placeholder="Allergies" value={allergies} onChangeText={setAllergies} />
            <TextInput placeholder="Past Surgery" value={pastSurgery} onChangeText={setPastSurgery} />
            <TextInput placeholder="Other Medical Conditions" value={otherMedicalConditions} onChangeText={setOtherMedicalConditions} />
            <Button title="Upload Photo" onPress={() => {/* Implement image picker logic */}} />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
}
