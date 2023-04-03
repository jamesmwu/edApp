import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import { COLORS, globalStyles, URL } from '../styles/global';
import Text from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import StickyHeaderFlatlist from "react-native-sticky-header-flatlist";
import { Fragment } from 'react';
import axios from 'axios';


export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUnits();
    }, []);

    //Gets units
    async function getUnits() {
        try {
            const response = await axios.get(URL + '/units');
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Fragment>
            {
                isLoading ? (<ActivityIndicator size="large" />) :
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
                                            <CustomButton label={item.name} onPress={() => { navigation.navigate('Quiz', { stage: item.stage }); }} />

                                        </View>

                                    );
                                }}
                                data={data}
                                style={{ width: "100%" }}
                            />
                        </SafeAreaView>
                    </Fragment>
            }
        </Fragment>

    );
}




