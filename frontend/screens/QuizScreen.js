import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated } from 'react-native';
import { COLORS, SIZES } from '../styles/global';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function QuizScreen({ navigation }) {

    const allQuestions = [
        {
            question: "What’s the biggest planet in our solar system?",
            options: ["Jupiter", "Saturn", "Neptune", "Mercury"],
            correct_option: "Jupiter"
        },
        {
            question: "What attraction in India is one of the famus in the world?",
            options: ["Chand Minar", "Taj Mahal", "Stadium"],
            correct_option: "Taj Mahal"
        },
        {
            question: "What land animal can open its mouth the widest?",
            options: ["Alligator", "Crocodile", "Baboon", "Hippo"],
            correct_option: "Hippo"
        },
        // {
        //     question: "What is the largest animal on Earth?",
        //     options: ["The African elephant", "The blue whale", "The sperm whale", "The giant squid"],
        //     correct_option: "The blue whale"
        // },
        // {
        //     question: "What is the only flying mammal?",
        //     options: ["The bat", "The flying squirrel", "The bald eagle", "The colugo"],
        //     correct_option: "The bat"
        // }
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1);
        }
        // Show Next Button
        setShowNextButton(true);
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };
    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
    };
    const finishQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();

        navigation.navigate('Home');
    };



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        color: COLORS.white, fontSize: 18, opacity: 0.6, marginRight: 2, fontFamily: "DM-Sans"
                    }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{
                        color: COLORS.white, fontSize: 18, opacity: 0.6, fontFamily: "DM-Sans"
                    }}> / {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30,
                    fontFamily: "DM-Sans"
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        );
    };
    const renderOptions = () => {
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
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{
                                fontSize: 20, color: COLORS.black, fontFamily: "DM-Sans"
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
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        marginTop: 80, width: '100%', backgroundColor: COLORS.success, padding: 20, borderRadius: 5
                    }}>
                    <Text style={{
                        fontSize: 20, color: COLORS.white, textAlign: 'center', fontFamily: "DM-Sans"
                    }}>Next</Text>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    };


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    });
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: COLORS.accent,

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.secondary
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        );
    };


    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.background,
        }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 22,
                position: 'relative',
                marginTop: 40,
                // justifyContent: "space-evenly",
            }}>

                {/* ProgressBar */}
                {renderProgressBar()}

                {/* Question */}
                {renderQuestion()}

                {/* Options */}
                {renderOptions()}

                {/* Next Button */}
                {renderNextButton()}

                {/* Score Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.secondary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 30, fontWeight: 'bold', fontFamily: "DM-Sans"
                            }}>{score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    fontFamily: "DM-Sans",
                                    color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 30, color: COLORS.black
                                }}> / {allQuestions.length}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                                onPress={finishQuiz}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20, fontFamily: "DM-Sans"
                                }}>Finish Quiz!</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>

                {/* Background Image */}
                {/* <Image
                    source={require('../assets/images/DottedBG.png')}
                    style={{
                        width: SIZES.width,
                        height: 130,
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.5
                    }}
                    resizeMode={'contain'}
                /> */}

            </View>
        </View>
    );
}