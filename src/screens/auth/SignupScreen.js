import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-[5rem]">
          <View className="flex-row items-start justify-start mb-5">
            <Image
              source={require("../../assets/logo/logo.png")}
              className="w-[4rem] h-[4rem]"
            />
          </View>

          <Text className="text-4xl font-bold mb-6"
            style={{ fontFamily: "Livvic_600SemiBold" }}
          >Sign Up</Text>

          <View className="flex-row justify-between">
            <View className="flex-1 mr-2">
              <CustomInput
                label="First Name"
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View className="flex-1 ml-2">
              <CustomInput
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View>
            <CustomInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View>
            <CustomInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <CustomInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
          </View>

          <View className="mb-4">
            <View className="flex-row items-center my-2">
              <Text className="text-gray-500 mr-2">—</Text>
              <Text className="text-gray-500"
                style={{ fontFamily: "Livvic_600SemiBold" }}
              >At least 8 Characters</Text>
            </View>
            <View className="flex-row items-center my-2">
              <Text className="text-gray-500 mr-2">—</Text>
              <Text className="text-gray-500"
                style={{ fontFamily: "Livvic_600SemiBold" }}
              >At least 1 Uppercase Letter</Text>
            </View>
            <View className="flex-row items-center my-2">
              <Text className="text-gray-500 mr-2">—</Text>
              <Text className="text-gray-500"
                style={{ fontFamily: "Livvic_600SemiBold" }}
              >At least 1 symbol</Text>
            </View>
          </View>

          <CustomButton
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
              navigation.navigate("EmailVerification");
              
            }}
            className="bg-[#473BF0] py-4 rounded-lg mb-4"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </CustomButton>

          <View className="flex-row justify-center items-center my-4">
            <Text className="text-gray-600"
              style={{ fontFamily: "Livvic_600SemiBold" }}>Have an Account? </Text>
            <Text
              onPress={() => navigation.navigate("Login")}
              className="text-[#473BF0] font-semibold"
              style={{ fontFamily: "Livvic_600SemiBold" }}
            >
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}