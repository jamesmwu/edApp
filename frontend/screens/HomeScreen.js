import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import Text from '../components/CustomText';
import QuizScreen from './QuizScreen';
import { TouchableOpacity } from 'react-native';


export default function HomeScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('Quiz'); }}>
                <Text>Ooga booga</Text>
            </TouchableOpacity>
            {/* <QuizScreen /> */}
        </View>
    );
}