import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function RenderMCQ({ allQuestions, currentQuestionIndex, validateAnswer, isOptionsDisabled, currentOptionSelected, correctOption }) {
    return (
        <View>
            {
                allQuestions[currentQuestionIndex]?.options.map(option => (
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
                            minHeight: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginVertical: 10,
                        }}
                    >
                        <Text style={{
                            fontSize: 20, color: COLORS.black, fontFamily: "DM-Sans", maxWidth: 270, flexWrap: "wrap"
                        }}>{option}</Text>

                        {/* Show Check Or Cross Icon based on correct answer*/}
                        {
                            option == correctOption ? (
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
                            ) : option == currentOptionSelected ? (
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
                        }

                    </TouchableOpacity>
                ))
            }
        </View >
    );
};