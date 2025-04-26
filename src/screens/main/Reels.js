import React, { useState, useRef } from "react"
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from "react-native"
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Video } from "expo-av"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Reel Item Component
const ReelItem = ({ item, isActive }) => {
  const videoRef = useRef(null)

  React.useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.playAsync()
      } else {
        videoRef.current.pauseAsync()
      }
    }
  }, [isActive])

  return (
    <View className="flex-1 bg-black" style={{ height: SCREEN_HEIGHT }}>
      <Video
        ref={videoRef}
        source={{ uri: item.videoUrl }}
        style={{ flex: 1 }}
        resizeMode="cover"
        isLooping
        shouldPlay={isActive}
      />
      
      {/* Overlay Content */}
      <View className="absolute bottom-0 left-0 right-0 p-6">
        {/* User Info */}
        <View className="flex-row items-center mb-4">
          <Image source={item.userAvatar} className="w-10 h-10 rounded-full" />
          <Text className="text-white font-semibold ml-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
            {item.username}
          </Text>
          <TouchableOpacity className="bg-[#473BF0] rounded-full px-3 py-1 ml-3">
            <Text className="text-white text-xs font-medium" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Caption */}
        <Text className="text-white mb-4" style={{ fontFamily: "Livvic_400Regular" }}>
          {item.caption}
        </Text>
        
        {/* Music */}
        <View className="flex-row items-center mb-6">
          <Ionicons name="musical-notes" size={16} color="white" />
          <Text className="text-white ml-2" style={{ fontFamily: "Livvic_400Regular" }}>
            {item.music}
          </Text>
        </View>
      </View>
      
      {/* Right Side Actions */}
      <View className="absolute right-4 bottom-32 items-center">
        <TouchableOpacity className="items-center mb-6">
          <FontAwesome name="heart" size={28} color="white" />
          <Text className="text-white text-xs mt-1" style={{ fontFamily: "Livvic_400Regular" }}>
            {item.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center mb-6">
          <Feather name="message-circle" size={28} color="white" />
          <Text className="text-white text-xs mt-1" style={{ fontFamily: "Livvic_400Regular" }}>
            {item.comments}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center mb-6">
          <Feather name="share" size={28} color="white" />
          <Text className="text-white text-xs mt-1" style={{ fontFamily: "Livvic_400Regular" }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function Reels({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Sample reels data
  const reels = [
    {
      id: 1,
      username: "Emma",
      userAvatar: require("../../assets/users/1.png"),
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-walking-under-a-bridge-32693-large.mp4",
      caption: "Exploring the city vibes today! #citylife #adventure",
      music: "City Vibes - Urban Beats",
      likes: "2.5K",
      comments: "342"
    },
    {
      id: 2,
      username: "James",
      userAvatar: require("../../assets/users/2.png"),
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      caption: "Nature always finds a way to amaze us ✨ #nature #peaceful",
      music: "Peaceful Moments - Nature Sounds",
      likes: "1.8K",
      comments: "156"
    },
    {
      id: 3,
      username: "Sarah",
      userAvatar: require("../../assets/users/3.png"),
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
      caption: "Beach day is always a good day 🌊 #beach #summer",
      music: "Summer Waves - Beach Tunes",
      likes: "3.2K",
      comments: "278"
    },
  ]

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={reels}
        renderItem={({ item, index }) => (
          <ReelItem item={item} isActive={index === activeIndex} />
        )}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      {/* Header */}
      <View className="absolute top-10 left-0 right-0 flex-row justify-between items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold" style={{ fontFamily: "Livvic_700Bold" }}>
          Reels
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <Feather name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}