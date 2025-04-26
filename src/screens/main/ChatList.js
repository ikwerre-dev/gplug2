import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"

// Chat Item Component
const ChatItem = ({ avatar, name, lastMessage, time, unread, online, onPress }) => (
  <TouchableOpacity 
    className="flex-row items-center p-4 border-b border-gray-100"
    onPress={onPress}
    activeOpacity={1}
  >
    <View className="relative">
      <Image source={avatar} className="w-14 h-14 rounded-full" />
      {online && (
        <View className="absolute bottom-0 right-0 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white" />
      )}
    </View>
    
    <View className="flex-1 ml-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 font-semibold text-base" style={{ fontFamily: "Livvic_600SemiBold" }}>
          {name}
        </Text>
        <Text className="text-gray-500 text-xs" style={{ fontFamily: "Livvic_400Regular" }}>
          {time}
        </Text>
      </View>
      
      <View className="flex-row justify-between items-center mt-1">
        <Text 
          className="text-gray-600 flex-1 pr-4" 
          style={{ fontFamily: "Livvic_400Regular" }}
          numberOfLines={1}
        >
          {lastMessage}
        </Text>
        
        {unread > 0 && (
          <View className="bg-[#473BF0] rounded-full w-5 h-5 flex items-center justify-center">
            <Text className="text-white text-xs font-bold">{unread}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
)

export default function ChatList({ navigation }) {
  // Sample chats data
  const chats = [
    { 
      id: 1, 
      name: "Emma", 
      avatar: require("../../assets/users/1.png"), 
      lastMessage: "Hey, how are you doing today?", 
      time: "2m ago", 
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: "James", 
      avatar: require("../../assets/users/2.png"), 
      lastMessage: "I'd love to meet up this weekend if you're free", 
      time: "15m ago", 
      unread: 0,
      online: true
    },
    { 
      id: 3, 
      name: "Sarah", 
      avatar: require("../../assets/users/3.png"), 
      lastMessage: "That sounds great! Looking forward to it", 
      time: "1h ago", 
      unread: 0,
      online: false
    },
    { 
      id: 4, 
      name: "Michael", 
      avatar: require("../../assets/users/4.png"), 
      lastMessage: "Did you see the new restaurant that opened downtown?", 
      time: "3h ago", 
      unread: 1,
      online: false
    },
    { 
      id: 5, 
      name: "Jessica", 
      avatar: require("../../assets/users/5.png"), 
      lastMessage: "Thanks for the recommendation!", 
      time: "5h ago", 
      unread: 0,
      online: false
    },
  ]

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""}`}>
      <View className="px-6 py-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#473BF0" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
            Messages
          </Text>
          <TouchableOpacity>
            <Feather name="edit" size={24} color="#473BF0" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Feather name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search messages"
            placeholderTextColor="#6B7280"
            className="ml-2 flex-1"
            style={{ fontFamily: "Livvic_400Regular" }}
          />
        </View>
      </View>

      <ScrollView>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            avatar={chat.avatar}
            name={chat.name}
            lastMessage={chat.lastMessage}
            time={chat.time}
            unread={chat.unread}
            online={chat.online}
            onPress={() => navigation.navigate("Chat", { userId: chat.id, name: chat.name })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}