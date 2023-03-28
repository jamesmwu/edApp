import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function RenderMatch({ allQuestions, currentQuestionIndex, validateMatchAnswer, isOptionsDisabled, currentOptionSelected, correctOption }) {
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
        if (leftSelect !== -1 && rightSelect !== -1) {
            validateMatchAnswer(leftSelect, rightSelect);
        }
    }, [leftSelect, rightSelect]);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'column' }}>
                {
                    allQuestions[currentQuestionIndex]?.options.left.map((leftOption, index) => (
                        <TouchableOpacity
                            onPress={() => selectFunction(index, "left")}
                            disabled={isOptionsDisabled}
                            key={leftOption}
                            style={{
                                borderWidth: 3,
                                borderColor: correctOption.has(leftOption)
                                    ? COLORS.success
                                    : leftOption == currentOptionSelected
                                        ? COLORS.error
                                        : index == leftSelect ? COLORS.secondary : COLORS.gray,
                                backgroundColor: correctOption.has(leftOption)
                                    ? COLORS.successAccent
                                    : leftOption == currentOptionSelected
                                        ? COLORS.errorAccent
                                        : COLORS.white,
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{
                                fontSize: 20, color: COLORS.black, fontFamily: "DM-Sans"
                            }}>{leftOption}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {/* {
                            leftOption == correctOption ? (
                                <View style={{
                                    width: 30, height: 30, borderRadius: 30 / 2,
                                    backgroundColor: COLORS.success,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <MaterialIcons name="check" style={{
                                        color: COLORS.white,
                                        fontSize: 20
                                    }} />

                                </View>
                            ) : leftOption == currentOptionSelected ? (
                                <View style={{
                                    width: 30, height: 30, borderRadius: 30 / 2,
                                    backgroundColor: COLORS.error,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <MaterialIcons name="close" style={{
                                        color: COLORS.white,
                                        fontSize: 20
                                    }} />
                                </View>
                            ) : null
                        } */}

                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{ flexDirection: 'column' }}>
                {
                    allQuestions[currentQuestionIndex]?.options.right.map((rightOption, index) => (
                        <TouchableOpacity
                            onPress={() => { selectFunction(index, "right"); }}
                            disabled={isOptionsDisabled}
                            key={rightOption}
                            style={{
                                borderWidth: 3,
                                borderColor: correctOption.has(rightOption)
                                    ? COLORS.success
                                    : rightOption == currentOptionSelected
                                        ? COLORS.error
                                        : index == rightSelect ? COLORS.secondary : COLORS.gray,
                                backgroundColor: correctOption.has(rightOption)
                                    ? COLORS.successAccent
                                    : rightOption == currentOptionSelected
                                        ? COLORS.errorAccent
                                        : COLORS.white,
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{
                                fontSize: 20, color: COLORS.black, fontFamily: "DM-Sans"
                            }}>{rightOption}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}

                        </TouchableOpacity>))
                }
            </View>
        </View>
    );
};
