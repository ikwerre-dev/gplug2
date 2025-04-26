


// Screen 3: New Password Entry
import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Ionicons } from "@expo/vector-icons";

export function ForgotPasswordResetScreen() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleResetPassword = () => {
        setLoading(true);
        // Add password reset logic here
        setTimeout(() => {
            setLoading(false);
            navigation.navigate("Login");
        }, 1000);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 pt-8">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mb-12">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "Livvic_700Bold" }}
                >Forgot Password</Text>
                <Text className="text-gray-500 mb-6"
                    style={{ fontFamily: "Livvic_500Medium" }}
                >Input your new password</Text>

                <View className="mb-4">
                    <View className="relative">
                        <CustomInput
                            placeholder="Password"
                            value={newPassword}
                            label={'New Password'}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                        />

                    </View>
                </View>

                <View className="mb-8">
                    <View className="relative">
                        <CustomInput
                            placeholder="Password"
                            label={'Confirm Password'}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />

                    </View>
                </View>

                <CustomButton
                    onPress={handleResetPassword}
                    className="bg-[#473BF0] py-4 rounded-lg mt-auto"
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        "Reset Password"
                    )}
                </CustomButton>
            </View>
        </SafeAreaView>
    );
}