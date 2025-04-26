import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Ionicons } from "@expo/vector-icons";

export function ForgotPasswordEmailScreen() {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 pt-12">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mb-12">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "Livvic_600SemiBold" }}
                >Forgot Password</Text>
                <Text className="text-gray-500 mb-6"
                    style={{ fontFamily: "Livvic_400Regular" }}
                >Check your mail</Text>

                <View className="bg-gray-50 rounded-lg p-5 mb-8 border border-[#CED4DE] flex-row items-center">
                    <Image
                        source={require("../../assets/icons/mail.png")}
                        className="w-16 h-16 mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-semibold mb-1"
                            style={{ fontFamily: "Livvic_600SemiBold" }}
                        >Check Your Email</Text>
                        <Text className="text-gray-500"
                            style={{ fontFamily: "Livvic_400Regular" }}
                        >
                            An email has been sent to your account for confirmation. Please click the link to finalize your account setup successfully
                        </Text>
                    </View>
                </View>

                <CustomButton
                    onPress={() => navigation.navigate("ForgotPasswordOTP")}
                    className="bg-[#473BF0] py-4 rounded-lg mt-auto"
                >
                    Next
                </CustomButton>
            </View>
        </SafeAreaView>
    );
}
