import { View, SafeAreaView } from 'react-native';
import { COLORS, globalStyles } from '../styles/global';
import Text from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import StickyHeaderFlatlist from "react-native-sticky-header-flatlist";
import { Fragment } from 'react';

const DATA = [
    {
        title: "Unit 1",
        lessons: [
            { title: "bruh" },
            { title: "chicken" }
        ]
    },
    {
        title: "Unit 2",
        lessons: [
            { title: "lol" },
            { title: "that's a rip" }
        ]
    },
    {
        title: "Unit 3",
        lessons: [
            { title: "ooga" },
            { title: "booga" }
        ]
    },
    {
        title: "Unit 4",
        lessons: [
            { title: "ooga" },
            { title: "booga" }
        ]
    },
    {
        title: "Unit 5",
        lessons: [
            { title: "ooga" },
            { title: "booga" }
        ]
    },
    {
        title: "Unit 6",
        lessons: [
            { title: "ooga" },
            { title: "booga" }
        ]
    },
    {
        title: "Unit 7",
        lessons: [
            { title: "ooga" },
            { title: "booga" }
        ]
    },

];

export default function HomeScreen({ navigation }) {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.accent }} />
            <SafeAreaView style={globalStyles.container}>

                <StickyHeaderFlatlist
                    keyExtractor={(_, i) => i + ""}
                    childrenKey={"lessons"}
                    renderHeader={({ item }) => {
                        return (
                            <Text style={{
                                padding: 20,
                                backgroundColor: COLORS.accent,
                                textAlign: "center",
                                color: COLORS.white,
                                fontWeight: "bold"
                            }}>
                                {item.title}
                            </Text>
                        );
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    alignItems: "center",
                                    marginTop: 40,
                                }}
                            >
                                <CustomButton label={item.title} onPress={() => { navigation.navigate('Lesson'); }} />

                            </View>

                        );
                    }}
                    data={DATA}
                    style={{ width: "100%" }}
                />
            </SafeAreaView>
        </Fragment>

    );
}




