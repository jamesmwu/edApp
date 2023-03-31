import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const { login } = useContext(AuthContext);

    function validate(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false;
        }
        return true;
    }

    async function handleLogin(username, password) {
        let correctEmail = validate(username);
        if (!correctEmail) {
            setError(true);
            return;
        }

        try {
            let valid = await login(username, password);
            if (!valid) {
                // console.log("LOGIN");
                setError(true);
                return;
            }

            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }


    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text
                    style={globalStyles.authHeaderText}>
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

                {error ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                        <Text style={globalStyles.error}>Incorrect login information.</Text>
                    </View>
                    : null}


                <CustomButton label={"Login"} onPress={() => { handleLogin(username, password); }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>New to the app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={globalStyles.emphasisText}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

