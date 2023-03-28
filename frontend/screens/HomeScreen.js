import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import Text from '../components/CustomText';


export default function HomeScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text>Ooga booga</Text>
        </View>
    );
}