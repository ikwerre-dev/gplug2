import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useAuth } from "../../context/AuthContext";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please fill in both email and password.");
        return;
      }

      // Simple email format validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        Alert.alert("Error", "Please enter a valid email.");
        return;
      }

      // Use the login function from context
      const success = await login(email, password);

      if (success) {
        // Login successful - the app will automatically redirect to Dashboard
        // because of the context change
      } else {
        Alert.alert("Error", "Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login", error);
      Alert.alert("Error", "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-[5rem]">
        <View className="flex-row items-start justify-start mb-5">
          <Image
            source={require("../../assets/logo/logo.png")}
            className="w-[4rem] h-[4rem]"
          />
        </View>
        <Text className="text-2xl mb-4" style={{ fontFamily: "Livvic_700Bold" }}>
          Welcome to G-Plug
        </Text>
        <Text
          className="text-base text-gray-600 mb-8"
          style={{ fontFamily: "Livvic_500Medium" }}
        >
          Please enter your email and password
        </Text>
        <View className="relative">
          <CustomInput
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
        </View>

        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          className="text-[#473BF0] text-right mb-4 font-semibold"
        >
          Forgot password?
        </Text>
        <CustomButton
          className="bg-[#473BF0] py-3 rounded-lg"
          onPress={handleLogin}
        >
          {loading ? "Signing In..." : "Sign In"}
        </CustomButton>
        <View className="flex-row justify-center space-x-1 font-semibold mt-4">
          <Text className="text-gray-600 font-semibold">Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate("SignUp")}
            className="text-[#473BF0] font-semibold ml-1"
          >
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}