import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const oddRowColor = "white";
const evenRowColor = "#f2f5f7";

/**
 * 
 * @param {*} props 
 * 
 * REQUIRED
 * data: Array of objects
 * sortBy: String
 * labelBy: String
 * 
 * OPTIONAL
 * sort: function
 * icon: String
 * onRowPress: function
 * renderItem: function
 * scoreStyle: object
 * rankStyle: object
 * labelStyle: object
 * avatarStyle: object
 * oddRowColor: string
 * evenRowColor: string
 * 
 * @returns Flatlist Leaderboard
 */
export default function Leaderboard(props) {
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const { data, sortBy, sort } = props;
        setSortedData(_sort(data, sortBy, sort));
    }, [props.data, props.sortBy, props.sort]);

    const defaultRenderItem = (item, index) => {
        const sortBy = props.sortBy;
        const evenColor = props.evenRowColor || evenRowColor;
        const oddColor = props.oddRowColor || oddRowColor;
        const rowColor = index % 2 === 0 ? evenColor : oddColor;

        const rowJSx = (
            <View style={[styles.row, { backgroundColor: rowColor }]}>
                <View style={styles.left}>
                    <Text
                        style={[
                            styles.rank,
                            props.rankStyle,
                            index < 9 ? styles.singleDidget : styles.doubleDidget
                        ]}
                    >
                        {parseInt(index) + 1}
                    </Text>
                    {props.icon && (
                        <View style={styles.imgContainer}>
                            <Image
                                source={{ uri: item[props.icon] }}
                                style={[styles.avatar, props.avatarStyle]}
                            />
                        </View>
                    )}
                    <Text style={[styles.label, props.labelStyle]} numberOfLines={1}>
                        {item[props.labelBy]}
                    </Text>
                </View>
                <Text style={[styles.score, props.scoreStyle]}>
                    {item[sortBy] || 0}
                </Text>
            </View>
        );

        return props.onRowPress ? (
            <TouchableOpacity onPress={() => props.onRowPress(item, index)}>
                {rowJSx}
            </TouchableOpacity>
        ) : (
            rowJSx
        );
    };

    const renderItem = ({ item, index }) => {
        return props.renderItem
            ? props.renderItem(item, index)
            : defaultRenderItem(item, index);
    };

    return (
        <FlatList
            data={sortedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderWidth: 0.5,
        // borderColor: "#d6d7da"
    },
    left: {
        flexDirection: "row",
        alignItems: "center"
    },
    rank: {
        fontSize: 20,
        // marginRight: 5,
        fontFamily: "DM-Sans-Bold"
    },
    singleDidget: {
        paddingLeft: 30,
        // paddingRight: 6,
    },
    doubleDidget: {
        paddingLeft: 30,
        paddingRight: 2,
    },
    label: {
        fontSize: 17,
        // flex: 1,
        paddingRight: 80,
        fontFamily: "DM-Sans",
    },
    score: {
        fontSize: 20,
        position: "absolute",
        right: 30,
        paddingLeft: 15,
        fontFamily: "DM-Sans-Bold"
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        marginHorizontal: 10,
    },
    imgContainer: {
        // backgroundColor: "red"
    }
});

const _sort = (data, sortBy, sort) => {
    if (sort) {
        return sort(data);
    } else if (typeof data === "object") {
        let sortedKeys =
            data &&
            Object.keys(data).sort((key1, key2) => {
                return data[key2][sortBy] - data[key1][sortBy];
            });
        return (
            sortedKeys &&
            sortedKeys.map(key => {
                return data[key];
            })
        );
    } else if (typeof data === "array") {
        return (
            data &&
            data.sort((item1, item2) => {
                return item2[sortBy] - item1[sortBy];
            })
        );
    }
};