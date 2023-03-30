import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/global';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function RenderTF({ validateAnswer, isOptionsDisabled, currentOptionSelected, correctOption }) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => validateAnswer("True")}
                disabled={isOptionsDisabled}
                style={{
                    borderWidth: 3,
                    borderColor: "True" == correctOption
                        ? COLORS.success
                        : "True" == currentOptionSelected
                            ? COLORS.error
                            : COLORS.gray,
                    backgroundColor: "True" == correctOption
                        ? COLORS.successAccent
                        : "True" == currentOptionSelected
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
                }}>True</Text>

                {/* Show Check Or Cross Icon based on correct answer*/}
                {
                    "True" == correctOption ? (
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
                    ) : "True" == currentOptionSelected ? (
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
            <TouchableOpacity
                onPress={() => validateAnswer("False")}
                disabled={isOptionsDisabled}
                style={{
                    borderWidth: 3,
                    borderColor: "False" == correctOption
                        ? COLORS.success
                        : "False" == currentOptionSelected
                            ? COLORS.error
                            : COLORS.gray,
                    backgroundColor: "False" == correctOption
                        ? COLORS.successAccent
                        : "False" == currentOptionSelected
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
                }}>False</Text>

                {/* Show Check Or Cross Icon based on correct answer*/}
                {
                    "False" == correctOption ? (
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
                    ) : "False" == currentOptionSelected ? (
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
        </View >
    );
};