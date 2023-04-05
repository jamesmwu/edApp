import { View, Text, Image } from 'react-native';
import { COLORS, imageMap } from '../styles/global';


export default function RenderQuestion({ currentQuestionIndex, allQuestions }) {

    return (
        <View style={{
            marginVertical: 20,
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
            {allQuestions[currentQuestionIndex]?.questionImg ?
                <Image
                    style={{
                        width: 350,
                        height: 110,
                        resizeMode: 'contain',
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: COLORS.black,
                        marginTop: 20,
                        backgroundColor: COLORS.white,
                    }}
                    source={imageMap[allQuestions[currentQuestionIndex]?.questionImg]}
                />
                : null}

        </View>
    );
};