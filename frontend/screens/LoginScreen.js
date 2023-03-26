import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const { login } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text
                    style={styles.headerText}>
                    Login
                </Text>

                <InputField
                    label={'Email'}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 10 }}
                        />
                    }
                    value={username}
                    onChangeText={text => setUsername(text)}
                />

                <InputField
                    label={'Password'}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 10 }}
                        />
                    }
                    inputType="password"
                    // fieldButtonLabel={"Forgot?"}
                    // fieldButtonFunction={() => { }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <CustomButton label={"Login"} onPress={() => { login(username, password); }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>New to the app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.emphasisText}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
    },
    emphasisText: { color: '#AD40AF', fontWeight: '700' }
});

