import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"

// Notification Item Component
const NotificationItem = ({ avatar, name, action, time, read, onPress }) => (
  <TouchableOpacity 
    className={`flex-row items-center p-4 ${!read ? "bg-[#473BF010]" : ""}`}
    onPress={onPress}
    activeOpacity={1}
  >
    <View className="relative">
      <Image source={avatar} className="w-12 h-12 rounded-full" />
      {action === "like" && (
        <View className="absolute bottom-0 right-0 bg-[#473BF0] rounded-full p-1">
          <Ionicons name="heart" size={12} color="white" />
        </View>
      )}
      {action === "message" && (
        <View className="absolute bottom-0 right-0 bg-[#4B91FF] rounded-full p-1">
          <Feather name="message-circle" size={12} color="white" />
        </View>
      )}
      {action === "match" && (
        <View className="absolute bottom-0 right-0 bg-[#FF8C00] rounded-full p-1">
          <Ionicons name="star" size={12} color="white" />
        </View>
      )}
    </View>
    
    <View className="flex-1 ml-4">
      <View className="flex-row justify-between">
        <Text className="text-gray-800 font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
          {name}
        </Text>
        <Text className="text-gray-500 text-xs" style={{ fontFamily: "Livvic_400Regular" }}>
          {time}
        </Text>
      </View>
      
      <Text className="text-gray-600 mt-1" style={{ fontFamily: "Livvic_500Medium" }}>
        {action === "like" && "Liked your profile"}
        {action === "message" && "Sent you a message"}
        {action === "match" && "You matched with each other"}
      </Text>
    </View>
    
    {!read && <View className="w-2 h-2 rounded-full bg-[#473BF0]" />}
  </TouchableOpacity>
)

export default function Notifications({ navigation }) {
  // Sample notifications data
  const notifications = [
    { 
      id: 1, 
      name: "Emma", 
      avatar: require("../../assets/users/1.png"), 
      action: "like", 
      time: "2m ago", 
      read: false 
    },
    { 
      id: 2, 
      name: "James", 
      avatar: require("../../assets/users/2.png"), 
      action: "message", 
      time: "15m ago", 
      read: false 
    },
    { 
      id: 3, 
      name: "Sarah", 
      avatar: require("../../assets/users/3.png"), 
      action: "match", 
      time: "1h ago", 
      read: true 
    },
    { 
      id: 4, 
      name: "Michael", 
      avatar: require("../../assets/users/4.png"), 
      action: "like", 
      time: "3h ago", 
      read: true 
    },
    { 
      id: 5, 
      name: "Jessica", 
      avatar: require("../../assets/users/5.png"), 
      action: "message", 
      time: "5h ago", 
      read: true 
    },
  ]

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""}`}>
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#473BF0" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
          Notifications
        </Text>
        <TouchableOpacity>
          <Text className="text-[#473BF0] font-medium" style={{ fontFamily: "Livvic_600SemiBold" }}>
            Mark all read
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            avatar={notification.avatar}
            name={notification.name}
            action={notification.action}
            time={notification.time}
            read={notification.read}
            onPress={() => {
              if (notification.action === "message") {
                navigation.navigate("Chat", { userId: notification.id, name: notification.name });
              } else {
                navigation.navigate("ProfileDetails", { userId: notification.id });
              }
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}