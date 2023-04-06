// import Text from '../components/CustomText';
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

export default function EditProfileScreen({ navigation }) {
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const { register } = useContext(AuthContext);

    return (
        <View style={globalStyles.editProfileContainer}>
            <Text style={globalStyles.authHeaderText}>
                Edit Profile
            </Text>
            <View>
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
            </View>
            <CustomButton label='Save' onPress={() => { navigation.navigate("Profile"); }} />
            <CustomButton label='Cancel' onPress={() => { navigation.navigate("Profile"); }} />
        </View>
    );
}
