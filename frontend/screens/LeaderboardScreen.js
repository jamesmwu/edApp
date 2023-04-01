import React, { useEffect, useState, Fragment } from "react";
import Text from '../components/CustomText';
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { globalStyles, COLORS, URL } from '../styles/global';
import Leaderboard from "../components/Leaderboard";
import axios from "axios";

export default function LeaderboardScreen({ navigation }) {
    const [props, setProps] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    //Gets users
    async function getUsers() {
        try {
            const response = await axios.get(URL + '/users');

            setProps({
                labelBy: "name",
                sortBy: "score",
                data: response.data,
                icon: "iconUrl",
                // onRowPress: (item, index) => {
                //     alert(item.name + " clicked", item.score + " points, wow!");
                // },
                evenRowColor: COLORS.secondary,
            });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    // const [data, setData] = useState(DATA);

    const alert = (title, body) => {
        Alert.alert(
            title,
            body,
            [{ text: "OK", onPress: () => { } }],
            { cancelable: false }
        );
    };

    return (
        <Fragment>
            {isLoading ? <ActivityIndicator size="large" /> :
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            paddingTop: 50,
                            backgroundColor: COLORS.accent,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 30, color: "white", paddingBottom: 10, fontFamily: "DM-Sans-Bold" }}>
                            Leaderboard
                        </Text>
                    </View>

                    {/* Spread operator to receive properties as separate prop as opposed to single props obj */}
                    <Leaderboard {...props} />
                </View>
            }
        </Fragment>

    );
}






const DATA = [
    {
        name: "We Tu Lo",
        score: 30,
        iconUrl:
            "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg"
    },
    {
        name: "Adam Savage",
        score: 12,
        iconUrl:
            "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
    },
    {
        name: "Derek Black",
        score: 244,
        iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
    },
    {
        name: "Erika White",
        score: 0,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
    },
    {
        name: "We Tu Lo",
        score: 30,
        iconUrl:
            "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg"
    },
    {
        name: "Adam Savage",
        score: 12,
        iconUrl:
            "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
    },
    {
        name: "Derek Black",
        score: 244,
        iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
    },
    {
        name: "Erika White",
        score: 0,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
    },
    {
        name: "We Tu Lo",
        score: 30,
        iconUrl:
            "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg"
    },
    {
        name: "Adam Savage",
        score: 12,
        iconUrl:
            "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
    },
    {
        name: "Derek Black",
        score: 244,
        iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
    },
    {
        name: "Erika White",
        score: 0,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
    }

];
