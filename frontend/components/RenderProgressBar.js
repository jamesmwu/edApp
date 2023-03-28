import { View, Animated } from 'react-native';
import { COLORS } from '../styles/global';

export default function renderProgressBar({ progressAnim }) {
    return (
        <View style={{
            width: '100%',
            height: 20,
            borderRadius: 20,
            backgroundColor: COLORS.primary,

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