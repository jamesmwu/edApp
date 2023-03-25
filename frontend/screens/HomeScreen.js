import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Ooga booga</Text>
            <Button title="Hi" onPress={() => { logout(); }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
