
// Screen 2: OTP Verification
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export function ForgotPasswordOTPScreen() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const navigation = useNavigation();
    const otpInputs = useRef([]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if current input is filled
        if (value && index < 3) {
            otpInputs.current[index + 1].focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 pt-12">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mb-12">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "Livvic_700Bold" }}
                >Forgot Password</Text>
                <Text className="text-gray-500 mb-6"
                    style={{ fontFamily: "Livvic_500Medium" }}
                >Input your OTP</Text>

                <View className="bg-white rounded-lg  mb-6">
                    <View className="bg-white border border-[#D7E1F4] rounded-lg p-5 py-8 mb-6">
                        <Text className="text-xl font-semibold text-center mb-6"
                            style={{ fontFamily: "Livvic_700Bold" }}
                        >Input OTP</Text>

                        <View className="flex-row justify-between mb-4">
                            {[0, 1, 2, 3].map((index) => (
                                <TextInput
                                    key={index}
                                    ref={(input) => (otpInputs.current[index] = input)}
                                    className="w-16 h-16 border border-gray-300 rounded-md text-center text-xl"
                                    maxLength={1}
                                    keyboardType="number-pad"
                                    value={otp[index]}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                />
                            ))}
                        </View>
                    </View>


                    <View className="flex-row justify-center items-center mb-4">
                        <Text className="text-gray-600"
                            style={{ fontFamily: "Livvic_600SemiBold" }}>Didnt get an OTP? </Text>
                        <Text
                            onPress={() => navigation.navigate("Login")}
                            className="text-[#473BF0] font-semibold"
                            style={{ fontFamily: "Livvic_600SemiBold" }}
                        >
                            Resend
                        </Text>
                    </View>
                    <CustomButton
                        onPress={() => navigation.navigate("ForgotPasswordReset")}
                        className="bg-[#473BF0] py-4 rounded-lg mt-auto"
                    >
                        Next
                    </CustomButton>
                </View>
            </View>
        </SafeAreaView>
    );
}

