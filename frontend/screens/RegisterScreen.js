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
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const { register } = useContext(AuthContext);

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text
                    style={globalStyles.headerText}>
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

                <CustomButton label={"Register"} onPress={() => { register(username, password, name); }} />
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