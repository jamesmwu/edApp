import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';


//NOTE: Heights are hard coded right now. Search for alternative as questions grow?

export default function RenderMatch({ leftArr, rightArr, validateMatchAnswer, isOptionsDisabled, currentOptionSelected, correctOption }) {
    const [rightSelect, setRightSelect] = useState(-1);
    const [leftSelect, setLeftSelect] = useState(-1);

    const selectFunction = (index, side) => {
        //setting state works asynchronously
        if (side === "left") {
            index === leftSelect ? setLeftSelect(-1) : setLeftSelect(index);

        }
        else {
            index === rightSelect ? setRightSelect(-1) : setRightSelect(index);
        }

    };

    //Check if both selections have been made
    useEffect(() => {
        if (leftSelect !== null && rightSelect !== null && leftSelect !== -1 && rightSelect !== -1) {
            validateMatchAnswer(leftSelect, rightSelect);
        }
    }, [leftSelect, rightSelect]);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'column' }}>
                {
                    leftArr.map((leftOption, index) => (
                        <TouchableOpacity
                            onPress={() => selectFunction(index, "left")}
                            disabled={isOptionsDisabled}
                            key={leftOption}
                            style={{
                                borderWidth: 3,
                                borderColor: correctOption?.has(leftOption)
                                    ? COLORS.success
                                    : leftOption == currentOptionSelected
                                        ? COLORS.error
                                        : index == leftSelect ? COLORS.secondary : COLORS.gray,
                                backgroundColor: correctOption?.has(leftOption)
                                    ? COLORS.successAccent
                                    : leftOption == currentOptionSelected
                                        ? COLORS.errorAccent
                                        : COLORS.white,
                                height: 100, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{
                                fontSize: 20, color: COLORS.black, fontFamily: "DM-Sans", maxWidth: 100, flexWrap: "wrap"
                            }}>{leftOption}</Text>

                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{ flexDirection: 'column' }}>
                {
                    rightArr.map((rightOption, index) => (
                        <TouchableOpacity
                            onPress={() => { selectFunction(index, "right"); }}
                            disabled={isOptionsDisabled}
                            key={rightOption}
                            style={{
                                borderWidth: 3,
                                borderColor: correctOption?.has(rightOption)
                                    ? COLORS.success
                                    : rightOption == currentOptionSelected
                                        ? COLORS.error
                                        : index == rightSelect ? COLORS.secondary : COLORS.gray,
                                backgroundColor: correctOption?.has(rightOption)
                                    ? COLORS.successAccent
                                    : rightOption == currentOptionSelected
                                        ? COLORS.errorAccent
                                        : COLORS.white,
                                height: 100, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{
                                fontSize: 20, color: COLORS.black, fontFamily: "DM-Sans", maxWidth: 100, flexWrap: "wrap"
                            }}>{rightOption}</Text>

                        </TouchableOpacity>))
                }
            </View>
        </View>
    );
};
