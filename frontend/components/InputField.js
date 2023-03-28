import React from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { globalStyles } from '../styles/global';

export default function InputField({
    label,
    icon,
    inputType,
    fieldButtonLabel,
    fieldButtonFunction,
    value,
    onChangeText
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
            }}>
            {icon}
            {inputType === 'password' ? (
                <TextInput
                    placeholder={label}
                    style={{
                        flex: 1, paddingVertical: 0,
                        fontFamily: "DM-Sans"
                    }}
                    secureTextEntry={true}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            ) : (
                <TextInput
                    placeholder={label}
                    style={{
                        flex: 1, paddingVertical: 0,
                        fontFamily: 'DM-Sans'
                    }}
                    secureTextEntry={false}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            )}
            {fieldButtonFunction && fieldButtonLabel ? <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={globalStyles.inputFieldButton}>{fieldButtonLabel}</Text>
            </TouchableOpacity> : null}

        </View>
    );
}
