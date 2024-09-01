import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

export default function CameraComponent({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const { token } = route.params; // Access the token passed from the ProfessionalDashboardScreen

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handlePictureCapture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync({ base64: true });
            sendImage(photo);
        }
    };

    const sendImage = async (photo) => {
        try {
            const formData = new FormData();
            formData.append('photo', {
                uri: photo.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });

            const response = await axios.post('http://192.168.1.33:3000/verify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Navigate to UserDataScreen with the retrieved data
            navigation.navigate('UserData', { userData: response.data });
        } catch (error) {
            Alert.alert('Failed to send image', error.response?.data || 'An error occurred');
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)} />
            <View style={styles.buttonContainer}>
                <Button title="Capture" onPress={handlePictureCapture} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0.1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
