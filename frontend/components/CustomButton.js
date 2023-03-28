import { TouchableOpacity } from 'react-native';
import React from 'react';
import Text from '../components/CustomText';

export default function CustomButton({ label, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#AD40AF',
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
            }}>
            <Text
                style={{
                    fontFamily: "DM-Sans-Bold",
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#fff',
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
