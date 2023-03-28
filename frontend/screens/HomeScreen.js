import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import Text from '../components/CustomText';
import { TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <CustomButton label="Level 1" onPress={() => { navigation.navigate('Quiz'); }} />
            <Text>Brief desc</Text>
        </View>
    );
}