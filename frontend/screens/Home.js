import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Ooga booga</Text>
            <Button title="Hi" onPress={() => { navigation.navigate("Profile"); }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
