import React from "react";
import { TouchableOpacity, Text } from "react-native";
import FontLoader from "./FontLoader";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function CustomButton({
  variant = "filled",
  onPress,
  disabled = false,
  arrow,
  children,
}) {
  const handlePress = () => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      onPress && onPress();
    }
  };

  return (
    <FontLoader>
      <TouchableOpacity
        onPress={handlePress}
        className={`w-full flex flex-row ${disabled && "opacity-50 "} justify-center px-5 rounded-[1rem] py-5 ${
          variant === "filled"
            ? "bg-[#473BF0]"
            : "bg-white border border-[#473BF0]"
        }`}
      >
        <Text
          className={`text-start text-lg font-medium ${
            variant === "filled" ? "text-white" : "text-[#473BF0]"
          }`}
          style={{ fontFamily: "Livvic_600SemiBold" }}
          
        >
          {children}
        </Text>

      </TouchableOpacity>
    </FontLoader>
  );
}
