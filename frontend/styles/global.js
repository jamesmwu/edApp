import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const SIZES = {
    base: 10,
    width,
    height
};

// export const COLORS = {
//     yellow: '#F3E37C',
//     green: '#3E8914',
//     lightBrown: '#8D6346',
//     lightBlue: '#57C4E5',
//     darkBlue: '#0B4F6C'
// };

export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',

    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
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
        color: '#AD40AF', fontWeight: '700'
    },
    inputFieldButton: {
        fontFamily: 'DM-Sans-Bold',
        color: '#AD40AF',
        fontWeight: '700'
    }
});