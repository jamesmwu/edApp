import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

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
                    style={{ flex: 1, paddingVertical: 0 }}
                    secureTextEntry={true}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            ) : (
                <TextInput
                    placeholder={label}
                    style={{ flex: 1, paddingVertical: 0 }}
                    secureTextEntry={false}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}
