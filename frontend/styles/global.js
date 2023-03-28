import { StyleSheet } from "react-native";
// import * as font from 'expo-font';

const yellow = '#F3E37C';
const green = '#3E8914';
const lightBrown = '#8D6346';
const lightBlue = '#57C4E5';
const darkBlue = '#0B4F6C';

// font.loadAsync({
//     'DM-Sans': require('../assets/fonts/DMSans-Regular.ttf'),
//     'DM-Sans-Bold': require('../assets/fonts/DMSans-Bold.ttf')
// });


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBrown,
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