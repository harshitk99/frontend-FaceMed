import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default function InputField({ label, value, onChangeText, secureTextEntry, placeholder }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#333',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});
