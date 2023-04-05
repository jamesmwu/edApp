import { View, Image, TouchableOpacity } from 'react-native';
import { COLORS, imageMap } from '../styles/global';

export default function RenderMCQ({ allQuestions, currentQuestionIndex, validateAnswer, isOptionsDisabled, currentOptionSelected, correctOption }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: "center" }}>
                {
                    allQuestions[currentQuestionIndex]?.options.slice(0, allQuestions[currentQuestionIndex]?.options.length / 2).map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.gray,
                                backgroundColor: option == correctOption
                                    ? COLORS.successAccent
                                    : option == currentOptionSelected
                                        ? COLORS.errorAccent
                                        : COLORS.white,
                                width: 150,
                                borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                marginVertical: 10,
                            }}
                        >

                            <Image
                                style={{
                                    width: 120,
                                    height: 80,
                                    resizeMode: 'contain',
                                }}
                                source={imageMap[option]}
                            />

                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                {
                    allQuestions[currentQuestionIndex]?.options.slice(allQuestions[currentQuestionIndex]?.options.length / 2).map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.gray,
                                backgroundColor: option == correctOption
                                    ? COLORS.successAccent
                                    : option == currentOptionSelected
                                        ? COLORS.errorAccent
                                        : COLORS.white,
                                width: 150,
                                borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                marginVertical: 10,
                            }}
                        >
                            <Image
                                style={{
                                    width: 120,
                                    height: 80,
                                    resizeMode: 'contain',
                                }}
                                source={imageMap[option]}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View >
    );
};