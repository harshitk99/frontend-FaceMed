import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserDataScreen({ route }) {
    const { userData } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Information</Text>
            <Text style={styles.label}>Name: {userData.name}</Text>
            <Text style={styles.label}>Emergency Contact: {userData.emergencyContact}</Text>
            <Text style={styles.label}>Blood Group: {userData.bloodGroup}</Text>
            <Text style={styles.label}>Allergies: {userData.allergies || 'None'}</Text>
            <Text style={styles.label}>Past Surgeries: {userData.pastSurgery || 'None'}</Text>
            <Text style={styles.label}>Other Medical Conditions: {userData.otherMedicalConditions || 'None'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});
