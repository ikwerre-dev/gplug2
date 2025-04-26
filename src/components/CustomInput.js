import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated } from "react-native";
import FontLoader from "./FontLoader";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput({
  label,
  placeholder,
  leftComponent,
  passwordInput,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = new Animated.Value(props.value ? 1 : 0);

  // Update animation when value changes externally
  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || props.value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, props.value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Interpolated values for smooth animations
  const labelStyle = {
    position: 'absolute',
    left: leftComponent ? 44 : 16,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, -9], // Position exactly on the border when floating
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9CA3AF', isFocused ? '#473BF0' : '#6B7280'],
    }),
    zIndex: 10, // Ensure label is above the border
    backgroundColor: 'white', // Match the background color
    paddingHorizontal: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    }),
    lineHeight: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 18],
    }),
  };

  return (
    <View className="mb-6">
      <View className={`relative border ${isFocused ? 'border-[#473BF0]' : 'border-gray-300'} rounded-lg bg-white`}>
        <Animated.Text
          style={[
            labelStyle,
            {
              fontFamily: "Livvic_500Medium",
            }
          ]}
        >
          {label}
        </Animated.Text>
        
        <View className="flex-row items-center">
          {leftComponent && <View className="pl-4 pr-2">{leftComponent}</View>}
          <TextInput
            className="flex-1 px-4 text-base text-gray-800"
            style={{
              fontFamily: "Livvic_500Medium",
              paddingTop: 16,
              paddingBottom: 12,
              height: 56,
            }}
            placeholder={isFocused ? placeholder : ""}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={passwordInput && !showPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {passwordInput && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="pr-4"
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}