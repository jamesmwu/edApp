import Text from '../components/CustomText';
import { View, TouchableOpacity } from 'react-native';

export default function LessonScreen({ route, navigation }) {
    const { stage } = route.params;

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text>STAGE: {stage}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
                <Text>Go to Quiz</Text>
            </TouchableOpacity>
        </View>
    );
}