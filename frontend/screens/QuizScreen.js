import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Modal, Animated, ActivityIndicator } from 'react-native';
import { COLORS, URL } from '../styles/global';
import RenderQuestion from '../components/RenderQuestion';
import RenderProgressBar from '../components/RenderProgressBar';
import RenderMCQ from '../components/RenderMCQ';
import RenderImgMCQ from '../components/RenderImgMCQ';
import RenderMatch from '../components/RenderMatch';
import RenderTF from '../components/RenderTF';
import QuizNextButton from '../components/QuizNextButton';
import QuizExplanationButton from '../components/QuizExplanationButton';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function QuizScreen({ route, navigation }) {
    const { unitStage, lessonStage } = route.params;
    const { userInfo } = useContext(AuthContext);
    const [allQuestions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQuestions();
    }, []);

    //Gets questions
    async function getQuestions() {
        try {
            const response = await axios.get(`${URL}/questions/${unitStage}/${lessonStage}`);
            setQuestions(response.data);
            getExplanation(response.data[currentQuestionIndex]._id); //Set initial explanation
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    //Gets explanations
    async function getExplanation(id) {
        try {
            const response = await axios.get(`${URL}/questions/${id}`);
            setExplanation(response.data.explanation);
        } catch (error) {
            console.error(error);
        }
    }

    //Updates user score
    async function incrementScore() {

        axios.put(URL + '/users/updateScore/' + userInfo._id, {
            "incrementScore": 20
        }).then(res => {
            // console.log(res.data.score);
        }).catch(e => {
            console.log("Register Error " + e);
        });
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [correctMatchOption, setCorrectMatchOption] = useState(new Set());
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [showExplanationModal, setExplanationModal] = useState(false);
    const [explanation, setExplanation] = useState('');

    const explain = () => {
        setTimeout(() => {
            setExplanationModal(true);
        }, 1000); // Wait for 1 seconds before showing the modal            
    };

    const explainClose = () => {
        setExplanationModal(false);
        setShowNextButton(true);
    };

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Update question UI score and user score
            setScore(score + 1);
            incrementScore();
            setShowNextButton(true);
        }
        else explain();

        //Animate progress bar
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
    //User has matched all cards correctly
    useEffect(() => {
        if (correctMatchOption === null) return;
        if (correctMatchOption?.size === allQuestions[currentQuestionIndex]?.options?.left?.length * 2) {
            setScore(score + 1);
            setIsOptionsDisabled(true);
            incrementScore();

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
            getExplanation(allQuestions[currentQuestionIndex + 1]._id);
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
        else if (allQuestions[currentQuestionIndex]?.type === "imgMCQ") {
            return (<RenderImgMCQ allQuestions={allQuestions} currentQuestionIndex={currentQuestionIndex} validateAnswer={validateAnswer} isOptionsDisabled={isOptionsDisabled} currentOptionSelected={currentOptionSelected} correctOption={correctOption} />);
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
                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                            <QuizExplanationButton showExplanationButton={showNextButton} handleExplain={() => { setExplanationModal(true); }} displayText="Explanation" />
                            <QuizNextButton showNextButton={showNextButton} handleNext={handleNext} displayText="Next" />
                        </View>

                        {/* Explanation Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showExplanationModal}
                        >
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <View style={{
                                    backgroundColor: COLORS.white,
                                    width: '90%',
                                    borderRadius: 20,
                                    borderWidth: 3,
                                    padding: 20,
                                    flex: 0.65,
                                    alignItems: 'center',
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{
                                        fontSize: 30, fontFamily: "DM-Sans"
                                    }}>Explanation!</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginVertical: 20
                                    }}>
                                        <Text style={{ fontSize: 20 }}>{explanation}</Text>
                                    </View>
                                    {/* Close explanation button */}
                                    <TouchableOpacity
                                        onPress={() => { explainClose(); }}
                                        style={{
                                            backgroundColor: COLORS.accent,
                                            padding: 20, width: '100%', borderRadius: 20
                                        }}>
                                        <Text style={{
                                            textAlign: 'center', color: COLORS.white, fontSize: 20, fontFamily: "DM-Sans"
                                        }}>Got it!</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>


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
                                        fontSize: 30, fontFamily: "DM-Sans-Bold"
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