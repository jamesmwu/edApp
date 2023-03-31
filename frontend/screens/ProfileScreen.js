import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import Text from '../components/CustomText';
import { globalStyles } from '../styles/global';

export default function ProfileScreen() {
    const { userInfo, logout } = useContext(AuthContext);
    // console.log(userInfo);
    return (
        <View style={globalStyles.profileContainer}>
            <View style={globalStyles.profileHeader}>
                <Text style={globalStyles.headerText}>{userInfo.name}</Text>
                <Text>{userInfo.username}</Text>
            </View>
            <Text style={globalStyles.headerText}>Your Score: {userInfo.score}</Text>
            <View>
                <CustomButton label='Edit Profile' onPress={() => { console.log("Edit Profile Button pressed"); }} />
                <CustomButton label='Sign Out' onPress={() => { logout(); }} />
            </View>

        </View>
    );
}
