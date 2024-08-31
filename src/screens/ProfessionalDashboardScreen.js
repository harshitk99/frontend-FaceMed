import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';

export default function ProfessionalDashboardScreen({ navigation, route }) {
    const { token } = route.params; // Get the token from the login process

    return (
        <View style={styles.container}>
            <Button title="Scan and Verify" onPress={() => navigation.navigate('Camera', { token })} />
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
});
