import Text from '../components/CustomText';
import { View, TouchableOpacity } from 'react-native';

export default function LessonScreen({ navigation }) {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text>Lesson Screen here's your lesson ablahblahblah</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
                <Text>Go to Quiz</Text>
            </TouchableOpacity>
        </View>
    );
}