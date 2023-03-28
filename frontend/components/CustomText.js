import { Text } from 'react-native';
import { globalStyles } from '../styles/global';

export default function CustomText(props) {

    if (props.style) {
        return (
            <Text style={props.style}>{props.children}</Text>
        );
    }

    return (
        <Text style={globalStyles.text}>{props.children}</Text>
    );
}