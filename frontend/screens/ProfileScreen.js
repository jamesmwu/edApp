import { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

export default function ProfileScreen() {
    const { userInfo, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>{userInfo.name}</Text>
                <Text>{userInfo.username}</Text>
            </View>
            <CustomButton label='Edit Profile' onPress={() => { console.log("Edit Profile Button pressed"); }} />
            <CustomButton label='Sign Out' onPress={() => { logout(); }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
    },
});
