import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export default function EmailVerificationScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 pt-12 flex-1">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mb-12">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <View className="flex-1 items-center justify-start">
                    <Image
                        source={require("../../assets/icons/envelope.png")}
                        className="w-[10rem] h-[10rem] mb-8"
                        resizeMode="contain"
                    />

                    <Text className="text-2xl font-bold mb-4 text-center">
                        Verify Your Email To Continue
                    </Text>

                    <Text className="text-gray-500 text-center mb-12 px-6">
                        An email has been sent to your account for confirmation. Please click the link to finalize your account setup successfully
                    </Text>

                    <View className="flex-col w-full gap-5">
                        <CustomButton
                            onPress={() => {
                            }}
                            className="bg-[#473BF0] py-4 rounded-lg w-full mb-4"
                        >
                            Open Email
                        </CustomButton>

                        <CustomButton
                            variant=""
                            onPress={() => {
                            }}
                            className="border border-[#473BF0] py-4 rounded-lg mt-6 w-full items-center"
                        >
                            <Text className="text-[#473BF0] font-medium">Resend Link</Text>
                        </CustomButton>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}