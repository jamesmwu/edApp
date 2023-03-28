import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';


export default function QuizNextButton({ showNextButton, handleNext, displayText }) {
    if (showNextButton) {
        return (
            <TouchableOpacity
                onPress={handleNext}
                style={{
                    marginTop: 80, width: '100%', backgroundColor: COLORS.success, padding: 20, borderRadius: 5
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