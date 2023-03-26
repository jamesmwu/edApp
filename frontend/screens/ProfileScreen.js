import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
    const { userInfo, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Profile page kekw</Text>
            <Text>WHAT'S POPPIN {userInfo.name}</Text>
            <TouchableOpacity onPress={() => { logout(); }}>
                <Text>LOG OUT</Text>
            </TouchableOpacity>
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
