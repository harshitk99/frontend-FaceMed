import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Button from '../components/Button';
import TextInput from '../components/InputField';

export default function UpdateUserScreen({ navigation, route }) {
    const { token, userData } = route.params;

    const [emergencyContact, setEmergencyContact] = useState(userData.emergencyContact || '');
    const [bloodGroup, setBloodGroup] = useState(userData.bloodGroup || '');
    const [allergies, setAllergies] = useState(userData.allergies || '');
    const [pastSurgery, setPastSurgery] = useState(userData.pastSurgery || '');
    const [otherMedicalConditions, setOtherMedicalConditions] = useState(userData.otherMedicalConditions || '');
    const [photo, setPhoto] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('emergencyContact', emergencyContact);
            formData.append('bloodGroup', bloodGroup);
            formData.append('allergies', allergies);
            formData.append('pastSurgery', pastSurgery);
            formData.append('otherMedicalConditions', otherMedicalConditions);

            if (photo) {
                formData.append('photo', {
                    uri: photo.uri,
                    name: 'photo.jpg',
                    type: 'image/jpeg',
                });
            }

            await axios.post('http://192.168.1.33:3000/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            Alert.alert('Success', 'User data updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.response?.data || 'An error occurred while updating data');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Emergency Contact:</Text>
            <TextInput
                style={styles.input}
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                placeholder="Enter emergency contact"
            />

            <Text style={styles.label}>Blood Group:</Text>
            <TextInput
                style={styles.input}
                value={bloodGroup}
                onChangeText={setBloodGroup}
                placeholder="Enter blood group"
            />

            <Text style={styles.label}>Allergies:</Text>
            <TextInput
                style={styles.input}
                value={allergies}
                onChangeText={setAllergies}
                placeholder="Enter allergies"
            />

            <Text style={styles.label}>Past Surgery:</Text>
            <TextInput
                style={styles.input}
                value={pastSurgery}
                onChangeText={setPastSurgery}
                placeholder="Enter past surgeries"
            />

            <Text style={styles.label}>Other Medical Conditions:</Text>
            <TextInput
                style={styles.input}
                value={otherMedicalConditions}
                onChangeText={setOtherMedicalConditions}
                placeholder="Enter other medical conditions"
            />

            <Button title="Pick a new photo" onPress={pickImage} />

            <Button title="Update Information" onPress={handleUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
