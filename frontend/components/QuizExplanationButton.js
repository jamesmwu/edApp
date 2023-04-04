import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';


export default function QuizExplanationButton({ showExplanationButton, handleExplain, displayText }) {
    if (showExplanationButton) {
        return (
            <TouchableOpacity
                onPress={handleExplain}
                style={{
                    backgroundColor: COLORS.accent, padding: 17, borderRadius: 5
                }}>
                <Text style={{
                    fontSize: 20, color: COLORS.white, textAlign: 'center', fontFamily: "DM-Sans"
                }}>{displayText}</Text>
            </TouchableOpacity>
        );
    } else {
        return null;
    }
};