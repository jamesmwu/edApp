import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Modal, Animated } from 'react-native';
import { COLORS } from '../styles/global';
import RenderQuestion from '../components/RenderQuestion';
import RenderProgressBar from '../components/RenderProgressBar';
import RenderMCQ from '../components/RenderMCQ';
import RenderMatch from '../components/RenderMatch';
import QuizNextButton from '../components/QuizNextButton';


export default function QuizScreen({ navigation }) {

    const allQuestions = [
        {
            type: "Match",
            question: "ooga?",
            options: {
                left: ["booga", "cooga", "dooga", "wooga"],
                right: ["congo", "woot", "dog", "bruh"]
            },
            correct_option: {
                "booga": "bruh",
                "cooga": "congo",
                "dooga": "dog",
                "wooga": "woot"
            }
        },
        {
            type: "MCQ",
            question: "What’s the biggest planet in our solar system?",
            options: ["Jupiter", "Saturn", "Neptune", "Mercury"],
            correct_option: "Jupiter"
        },
        {
            type: "MCQ",
            question: "What attraction in India is one of the famus in the world?",
            options: ["Chand Minar", "Taj Mahal", "Stadium"],
            correct_option: "Taj Mahal"
        },
        {
            type: "MCQ",
            question: "What land animal can open its mouth the widest?",
            options: ["Alligator", "Crocodile", "Baboon", "Hippo"],
            correct_option: "Hippo"
        },
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [correctMatchOption, setCorrectMatchOption] = useState(new Set());
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

    const validateMatchAnswer = (leftSelect, rightSelect) => {
        let leftChoice = allQuestions[currentQuestionIndex].options.left[leftSelect];
        let rightChoice = allQuestions[currentQuestionIndex].options.right[rightSelect];
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];

        if (correct_option[leftChoice] === rightChoice) {
            setCorrectMatchOption((prevSet) => new Set([...prevSet, leftChoice, rightChoice]));
        }

        // console.log(correctMatchOption.size);
        // console.log(allQuestions[currentQuestionIndex].options.left.length);
    };

    useEffect(() => {
        if (correctMatchOption.size === allQuestions[currentQuestionIndex].options.left.length * 2) {
            setScore(score + 1);
            setIsOptionsDisabled(true);

            // Show Next Button
            setShowNextButton(true);
            Animated.timing(progress, {
                toValue: currentQuestionIndex + 1,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
    }, [correctMatchOption]);

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

    const renderOptions = () => {
        if (allQuestions[currentQuestionIndex]?.type === "MCQ") {
            return (<RenderMCQ allQuestions={allQuestions} currentQuestionIndex={currentQuestionIndex} validateAnswer={validateAnswer} isOptionsDisabled={isOptionsDisabled} currentOptionSelected={currentOptionSelected} correctOption={correctOption} />);
        }
        else if (allQuestions[currentQuestionIndex]?.type === "Match") {
            return (<RenderMatch allQuestions={allQuestions} currentQuestionIndex={currentQuestionIndex} validateMatchAnswer={validateMatchAnswer} isOptionsDisabled={isOptionsDisabled} currentOptionSelected={currentOptionSelected} correctOption={correctMatchOption} />);
        }
        else {
            console.log("Error reading options: question type not recognized.");
        }

    };

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    });


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
                <RenderProgressBar progressAnim={progressAnim} />

                {/* Question */}
                <RenderQuestion currentQuestionIndex={currentQuestionIndex} allQuestions={allQuestions} />

                {/* Options */}
                {renderOptions()}

                {/* Next Button */}
                <QuizNextButton showNextButton={showNextButton} handleNext={handleNext} displayText="Next" />

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
            </View>
        </View>
    );
}