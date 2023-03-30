import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Modal, Animated, ActivityIndicator } from 'react-native';
import { COLORS, URL } from '../styles/global';
import RenderQuestion from '../components/RenderQuestion';
import RenderProgressBar from '../components/RenderProgressBar';
import RenderMCQ from '../components/RenderMCQ';
import RenderMatch from '../components/RenderMatch';
import RenderTF from '../components/RenderTF';
import QuizNextButton from '../components/QuizNextButton';
import axios from 'axios';

export default function QuizScreen({ navigation }) {
    const [allQuestions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQuestions();
    }, []);

    //Gets questions
    async function getQuestions() {
        try {
            const response = await axios.get(URL + '/questions');
            setQuestions(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
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
            if (correctMatchOption === null) {
                setCorrectMatchOption(new Set());
            }
            setCorrectMatchOption((prevSet) => new Set([...prevSet, leftChoice, rightChoice]));
            return;
        }

        //Player got answer incorrect
        //Cards should flash red. If life system implemented, decrement one. Then let them keep trying.
    };

    //Used to validate match answer, useEffect necessary to monitor progress of set due to async
    useEffect(() => {
        if (correctMatchOption === null) return;
        if (correctMatchOption?.size === allQuestions[currentQuestionIndex]?.options?.left?.length * 2) {
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
            setCorrectMatchOption(null);
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
            return (<RenderMatch leftArr={allQuestions[currentQuestionIndex]?.options.left} rightArr={allQuestions[currentQuestionIndex]?.options.right} validateMatchAnswer={validateMatchAnswer} isOptionsDisabled={isOptionsDisabled} currentOptionSelected={currentOptionSelected} correctOption={correctMatchOption} />);
        }
        else if (allQuestions[currentQuestionIndex]?.type === "TF") {
            return (<RenderTF validateAnswer={validateAnswer} isOptionsDisabled={isOptionsDisabled} currentOptionSelected={currentOptionSelected} correctOption={correctOption} />);
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
            {
                isLoading ? (<ActivityIndicator size="large" />) :
                    <View style={{
                        flex: 1,
                        paddingVertical: 40,
                        paddingHorizontal: 22,
                        position: 'relative',
                        marginTop: 40,
                        justifyContent: "space-between",
                    }}>
                        <View>
                            {/* ProgressBar */}
                            <RenderProgressBar progressAnim={progressAnim} />

                            {/* Question */}
                            <RenderQuestion currentQuestionIndex={currentQuestionIndex} allQuestions={allQuestions} />

                            {/* Options */}
                            {renderOptions()}
                        </View>

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
                                    }}>{score > (allQuestions.length / 2) ? 'Nice job!' : 'Rip'}</Text>

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
            }
        </View>
    );
}