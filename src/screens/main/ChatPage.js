import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"

// Message Bubble Component
const MessageBubble = ({ message, isMine, time }) => (
  <View className={`max-w-[80%] mb-3 ${isMine ? "self-end" : "self-start"}`}>
    <View 
      className={`rounded-2xl p-3 ${
        isMine ? "bg-[#473BF0] rounded-tr-none" : "bg-gray-100 rounded-tl-none"
      }`}
    >
      <Text 
        className={isMine ? "text-white" : "text-gray-800"}
        style={{ fontFamily: "Livvic_400Regular" }}
      >
        {message}
      </Text>
    </View>
    <Text 
      className={`text-xs mt-1 text-gray-500 ${isMine ? "text-right" : "text-left"}`}
      style={{ fontFamily: "Livvic_400Regular" }}
    >
      {time}
    </Text>
  </View>
)

export default function Chat({ route, navigation }) {
  const { userId, name } = route.params
  const [message, setMessage] = useState("")
  const scrollViewRef = useRef()

  // Sample messages data
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", isMine: false, time: "10:30 AM" },
    { id: 2, text: "Hi! How are you?", isMine: true, time: "10:31 AM" },
    { id: 3, text: "I'm doing great, thanks for asking. How about you?", isMine: false, time: "10:32 AM" },
    { id: 4, text: "I'm good too! Just checking out this new app.", isMine: true, time: "10:33 AM" },
    { id: 5, text: "That's awesome! I've been using it for a few days now and really like it.", isMine: false, time: "10:35 AM" },
    { id: 6, text: "Have you tried the new features they just released?", isMine: false, time: "10:36 AM" },
    { id: 7, text: "Not yet, but I'm planning to check them out soon!", isMine: true, time: "10:38 AM" },
  ])

  const sendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isMine: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""}`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={() => navigation.goBack()} className="pr-4">
            <Feather name="arrow-left" size={24} color="#473BF0" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center flex-1"
            onPress={() => navigation.navigate("ProfileDetails", { userId })}
            activeOpacity={1}
          >
            <Image 
              source={require(`../../assets/users/1.png`)} 
              className="w-10 h-10 rounded-full"
            />
            <View className="ml-3">
              <Text className="font-semibold text-gray-800" style={{ fontFamily: "Livvic_600SemiBold" }}>
                {name}
              </Text>
              <Text className="text-xs text-green-500" style={{ fontFamily: "Livvic_400Regular" }}>
                Online
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity className="p-2">
            <Feather name="phone" size={20} color="#473BF0" />
          </TouchableOpacity>
          
          <TouchableOpacity className="p-2">
            <Feather name="video" size={20} color="#473BF0" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          className="flex-1 px-4 pt-4"
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              isMine={msg.isMine}
              time={msg.time}
            />
          ))}
        </ScrollView>

        {/* Message Input */}
        <View className="flex-row items-center px-4 py-2 border-t border-gray-100">
          <TouchableOpacity className="p-2 mr-2">
            <Feather name="plus-circle" size={24} color="#473BF0" />
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#6B7280"
              className="flex-1"
              style={{ fontFamily: "Livvic_400Regular" }}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity className="ml-2">
              <Feather name="smile" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-2">
              <Feather name  />
            </TouchableOpacity>
            <TouchableOpacity className="ml-2">
              <Feather name="camera" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            className="p-2 ml-2 bg-[#473BF0] rounded-full"
            onPress={sendMessage}
          >
            <Feather name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}