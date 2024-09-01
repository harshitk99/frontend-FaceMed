import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

export default function UserDashboardScreen({ route, navigation }) {
    const { token } = route.params;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://192.168.1.33:3000/userData', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (error) {
                Alert.alert('Failed to load user data');
            }
        };
        fetchUserData();
    }, []);

    return (
        <View>
            {userData && (
                <>
                    <Text>Name: {userData.name}</Text>
                    <Text>Emergency Contact: {userData.emergencyContact}</Text>
                    <Text>Blood Group: {userData.bloodGroup}</Text>
                    <Text>Allergies: {userData.allergies}</Text>
                    <Text>Past Surgery: {userData.pastSurgery}</Text>
                    <Text>Other Medical Conditions: {userData.otherMedicalConditions}</Text>
                    <Button
                        title="Update Information"
                        onPress={() => navigation.navigate('UpdateUser', { token, userData })}
                    />
                </>
            )}
        </View>
    );
}
