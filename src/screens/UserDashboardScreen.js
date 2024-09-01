import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import Button from '../components/Button';


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
                console.error('Error fetching user data:', error)
                Alert.alert('Failed to load user data');
            }
        };
        fetchUserData();
    }, [token]); // Add token as a dependency

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
