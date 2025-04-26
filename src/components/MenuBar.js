import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function MenuBar({ state, descriptors, navigation }) {
    const handlePress = (intensity, routeName, isFocused) => {
        if (isFocused) return;
        
        if (intensity === "light") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        else if (intensity === "medium") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        navigation.navigate(routeName);
    };

    const tabConfig = {
        Home: { icon: "heart", intensity: "heavy" },
        Find: { icon: "map-marker", intensity: "medium" },
        Reels: { icon: "play-circle", intensity: "medium" },
        Camera: { icon: "camera", intensity: "medium" },
        ChatList: { icon: "message-text", intensity: "light" }
    };

    const currentRoute = state.routes[state.index].name;
    if (currentRoute === "Reels" || currentRoute === "Camera") {
        return null;
    }

    return (
        <View className="absolute px-[2rem] py-[3rem] bottom-0 left-0 right-0">
            <View className="bg-[#473BF0] py-[1.5rem] rounded-[10rem] px-6 flex-row justify-between items-center">
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    const config = tabConfig[route.name];
                    
                    return (
                        <TouchableOpacity 
                            key={route.key}
                            onPress={() => handlePress(config.intensity, route.name, isFocused)}
                        >
                            <MaterialCommunityIcons 
                                name={config.icon} 
                                size={30} 
                                color={isFocused ? "white" : "#ffffff90"} 
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}