import React from "react";
import { View, Animated } from "react-native";


export default function WelcomeScreen({ navigation }) {

  const scaleValue = new Animated.Value(1);

  const animateImage = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(() => {
      navigation.replace('Login');
    });
  };

  React.useEffect(() => {
    animateImage();
  }, []);

  return (
    <View className="flex-1 bg-[#000] px-6">
      <View className="flex-1 justify-center items-center">
        <Animated.Image
          source={require("../../assets/logo/logo.png")}
          className="w-full h-[20rem] px-[5rem]"
          resizeMode="contain"
          style={{ transform: [{ scale: scaleValue }] }}
        />

      </View>

    </View>
  );
}
