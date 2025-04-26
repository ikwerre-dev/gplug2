import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function VerificationScreen({ navigation, route }) {
  const { phone } = route.params;
  console.log(route);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const accountType = await AsyncStorage.getItem("accountType");
        console.log("Phone Number:", phone);
        console.log("Session Token:", sessionToken);
        console.log("Account Type:", accountType);

        if (!sessionToken) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Invalid Session ID" || "An error occurred.",
          });

          navigation.navigate("RegistrationType");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, [phone]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = Array(6)
    .fill(0)
    .map(() => React.createRef());

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-[15rem]">
      <Text className="text-[28px] font-bold text-[#1A1C1E] mb-2">
        Phone Verification
      </Text>
      <Text className="text-base text-gray-600 mb-8">
        verification code was sent to +234{phone}
      </Text>

      <Text className="text-base text-[#1A1C1E] mb-4">Enter OTP Code</Text>
      <View className="flex-row justify-between mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            className="w-[52px] h-[52px] border-b border-gray-300 rounded-lg text-center text-lg"
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      <TouchableOpacity className="mb-8">
        <Text className="text-[#473BF0] text-base font-medium">
          Resend code
        </Text>
      </TouchableOpacity>

      <CustomButton onPress={() => navigation.replace("ProfileSetup")}>
        Verify
      </CustomButton>
      <Toast />
      
    </ScrollView>
  );
}
