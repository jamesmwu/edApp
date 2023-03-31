import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const URL = 'http://localhost:3001';


export const SIZES = {
    base: 10,
    width,
    height
};

//     yellow: '#F3E37C',
//     green: '#3E8914',
//     lightBrown: '#8D6346',
//     lightBlue: '#57C4E5',
//     darkBlue: '#0B4F6C'

export const COLORS = {
    primary: '#3498db',
    secondary: '#F3E37C',
    tertiary: '#8D6346',
    accent: "#252c4a",

    success: '#088137',
    successAccent: '#A4F6C5',
    error: '#ff4444',
    errorAccent: '#F7C0C0',

    black: "#171717",
    white: "#FFFFFF",
    gray: "#666666",
    background: "#57C4E5"
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'DM-Sans'
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'DM-Sans-Bold',
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
    },
    emphasisText: {
        fontFamily: 'DM-Sans-Bold',
        color: COLORS.primary,
        fontWeight: '700'
    },
    inputFieldButton: {
        fontFamily: 'DM-Sans-Bold',
        color: COLORS.primary,
        fontWeight: '700'
    },
    error: {
        color: COLORS.error,
        fontFamily: 'DM-Sans-Bold'
    }
});