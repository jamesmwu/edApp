import { View } from 'react-native';
import { globalStyles } from '../styles/global';
import Text from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import StickyHeaderFlatlist from "react-native-sticky-header-flatlist";

const DATA = [
    {
        title: "Family",
        contactList: [
            { title: "Armani Snider" },
            { title: "Macauly Downs" }
            //... More name
        ]
    },
    {
        title: "Company",
        contactList: [
            { title: "Armani Snider" },
            { title: "Macauly Downs" }
            //... More name
        ]
    },
    {
        title: "Club",
        contactList: [
            { title: "Armani Snider" },
            { title: "Macauly Downs" }
            //... More name
        ]
    },
    {
        title: "Company",
        contactList: [
            { title: "Armani Snider" },
            { title: "Macauly Downs" }
            //... More name
        ]
    },
    {
        title: "Club",
        contactList: [
            { title: "Armani Snider" },
            { title: "Macauly Downs" }
            //... More name
        ]
    }
];

export default function HomeScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            {/* <CustomButton label="Level 1" onPress={() => { navigation.navigate('Quiz'); }} />
            <Text>Brief desc</Text> */}

            <StickyHeaderFlatlist
                keyExtractor={(_, i) => i + ""}
                childrenKey={"contactList"}
                renderHeader={({ item }) => {
                    return (
                        <Text
                            style={{
                                padding: 20,
                                borderWidth: 1,
                                borderColor: "#000",
                                backgroundColor: "#eee",
                                textAlign: "center",
                                fontWeight: "bold"
                            }}
                        >
                            {item.title}
                        </Text>
                    );
                }}
                renderItem={({ item }) => {
                    return (
                        <Text
                            style={{
                                padding: 30,
                                borderWidth: 1,
                                borderColor: "#000",
                                backgroundColor: "#fff"
                            }}
                        >
                            {item.title}
                        </Text>
                    );
                }}
                data={DATA}
            />
        </View>
    );
}




