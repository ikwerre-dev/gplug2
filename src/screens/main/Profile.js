import React, { useState } from "react"
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
} from "react-native"
import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

// Image Gallery Component
const ImageGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
                    setActiveIndex(newIndex)
                }}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={image}
                        style={{ width: SCREEN_WIDTH, height: 450 }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {/* Pagination dots */}
            <View className="flex-row justify-center absolute bottom-4 left-0 right-0">
                {images.map((_, index) => (
                    <View
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 ${index === activeIndex ? "bg-white" : "bg-white/50"
                            }`}
                    />
                ))}
            </View>
        </View>
    )
}

// Interest Tag Component
const InterestTag = ({ label }) => (
    <View className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2">
        <Text className="text-gray-700" style={{ fontFamily: "Livvic_500Medium" }}>
            {label}
        </Text>
    </View>
)

export default function ProfileDetails({ route, navigation }) {
    const { userId } = route.params

    // Sample user data - in a real app, you would fetch this based on userId
    const user = {
        id: userId,
        name: userId === 1 ? "Emma" : "James",
        age: userId === 1 ? 27 : 31,
        location: "San Francisco, CA",
        distance: userId === 1 ? 2.3 : 4.7,
        bio: userId === 1
            ? "Love hiking, photography, and trying new restaurants. Looking for someone to share adventures with!"
            : "Software engineer by day, musician by night. Coffee enthusiast and dog lover.",
        interests: userId === 1
            ? ["Photography", "Hiking", "Foodie", "Travel", "Art", "Music"]
            : ["Music", "Coding", "Coffee", "Dogs", "Movies", "Fitness"],
        images: [
            require(`../../assets/users/2.png`),
            require("../../assets/users/1.png"),
            require("../../assets/users/2.png"),
            require("../../assets/users/3.png"),
        ],
        about: userId === 1
            ? "I'm a freelance photographer who loves to travel and explore new places. When I'm not behind the camera, you can find me hiking trails or trying out new restaurants. I'm passionate about art and music, and I'm always up for a concert or gallery opening."
            : "I work as a software engineer at a tech startup. In my free time, I play guitar in a local band and we occasionally perform at small venues. I'm a huge coffee enthusiast and love trying different brewing methods. I have a golden retriever named Max who's basically my best friend.",
        jobTitle: userId === 1 ? "Photographer" : "Software Engineer",
        company: userId === 1 ? "Freelance" : "Tech Startup",
        education: userId === 1 ? "Art Institute of San Francisco" : "Stanford University",
    }

    return (
        <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""}`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image Gallery */}
                <View className="relative">
                    <ImageGallery images={user.images} />

                    {/* Back Button */}
                    <TouchableOpacity
                        className="absolute top-4 left-4 bg-black/30 rounded-full p-2"
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View className="px-6 pt-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <View>
                            <Text className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
                                {user.name}, {user.age}
                            </Text>
                            <View className="flex-row items-center mt-1">
                                <Ionicons name="location" size={16} color="#6B7280" />
                                <Text className="text-gray-500 ml-1" style={{ fontFamily: "Livvic_400Regular" }}>
                                    {user.location} • {user.distance} km away
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row">
                            <TouchableOpacity className="bg-gray-100 rounded-full p-3 mr-3">
                                <Feather name="x" size={20} color="#6B7280" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#473BF0] rounded-full p-3">
                                <FontAwesome name="heart" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bio */}
                    <Text className="text-gray-700 mb-6" style={{ fontFamily: "Livvic_500Medium" }}>
                        {user.bio}
                    </Text>

                    {/* Interests */}
                    <Text className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
                        Interests
                    </Text>
                    <View className="flex-row flex-wrap mb-6">
                        {user.interests.map((interest, index) => (
                            <InterestTag key={index} label={interest} />
                        ))}
                    </View>

                    {/* About */}
                    <Text className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
                        About
                    </Text>
                    <Text className="text-gray-700 mb-6" style={{ fontFamily: "Livvic_400Regular" }}>
                        {user.about}
                    </Text>

                    {/* Work & Education */}
                    <Text className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
                        Work & Education
                    </Text>
                    <View className="mb-2">
                        <View className="flex-row items-center mb-1">
                            <MaterialIcons name="work" size={18} color="#6B7280" />
                            <Text className="text-gray-700 ml-2" style={{ fontFamily: "Livvic_500Medium" }}>
                                {user.jobTitle} at {user.company}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="school" size={18} color="#6B7280" />
                            <Text className="text-gray-700 ml-2" style={{ fontFamily: "Livvic_500Medium" }}>
                                {user.education}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="px-6 py-8 flex-row">
                    <TouchableOpacity
                        className="flex-1 bg-[#473BF0] rounded-xl py-3 items-center mr-3"
                        onPress={() => navigation.navigate("Chat", { userId: user.id, name: user.name })}
                    >
                        <Text className="text-white font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
                            Message
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-gray-100 rounded-xl p-3">
                        <Feather name="share" size={20} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}