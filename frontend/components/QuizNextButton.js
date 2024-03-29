import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';


export default function QuizNextButton({ showNextButton, handleNext, displayText }) {
    if (showNextButton) {
        return (
            <TouchableOpacity
                onPress={handleNext}
                style={{
                    minWidth: "40%", backgroundColor: COLORS.success, padding: 17, borderRadius: 5
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