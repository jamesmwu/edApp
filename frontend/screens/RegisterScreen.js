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

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const { register } = useContext(AuthContext);

    function validate(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text);
            return false;
        }
        else {
            setEmail(text);
            return true;
        }
    }

    function handleRegister(email, password, name) {
        let correctEmail = validate(email);
        if (!correctEmail) {
            setError(true);
            return;
        }

        let valid = register(email, password, name);
        if (!valid) {
            setError(true);
        }
    }

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text
                    style={globalStyles.authHeaderText}>
                    Register
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
                    value={email}
                    inputType="email"
                    onChangeText={text => setEmail(text)}
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
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <InputField
                    label={'Name'}
                    icon={
                        <MaterialIcons
                            name="mood"
                            size={20}
                            color="#666"
                            style={{ marginRight: 10 }}
                        />
                    }
                    value={name}
                    onChangeText={text => setName(text)}
                />

                {error ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                        <Text style={globalStyles.error}>Please enter valid email.</Text>
                    </View>
                    : null}

                <CustomButton label={"Register"} onPress={() => { handleRegister(email, password, name); }} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={globalStyles.emphasisText}> Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};