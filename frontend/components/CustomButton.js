import { TouchableOpacity } from 'react-native';
import React from 'react';
import Text from '../components/CustomText';
import { COLORS } from '../styles/global';

export default function CustomButton({ label, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: COLORS.secondary,
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
                alignItems: "center"
            }}>
            <Text
                style={{
                    fontFamily: "DM-Sans-Bold",
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 16,
                    color: COLORS.black,
                    width: 250,
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
