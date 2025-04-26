import React, { useState, useRef } from "react"
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Platform,
} from "react-native"
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons"
import MapView, { Marker, Circle } from "react-native-maps"

// User Marker Component
const UserMarker = ({ user, onPress }) => (
  <Marker
    coordinate={{
      latitude: user.latitude,
      longitude: user.longitude,
    }}
    onPress={() => onPress(user)}
  >
    <View className="items-center">
      <Image 
        source={user.avatar} 
        className="w-12 h-12 rounded-full border-2 border-white"
      />
    </View>
  </Marker>
)

// User Preview Modal Component
const UserPreviewModal = ({ user, visible, onClose, onViewProfile }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View className="flex-1 justify-end">
      <TouchableOpacity 
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"
        onPress={onClose}
        activeOpacity={1}
      />
      
      <View className="bg-white rounded-t-3xl p-6">
        <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
        
        <View className="flex-row mb-6">
          <Image 
            source={user?.avatar} 
            className="w-20 h-20 rounded-xl"
          />
          
          <View className="ml-4 flex-1 justify-center">
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
                {user?.name}, {user?.age}
              </Text>
              {user?.distance < 1 && (
                <View className="bg-green-100 px-2 py-1 rounded-full ml-2">
                  <Text className="text-green-600 text-xs">Nearby</Text>
                </View>
              )}
            </View>
            
            <Text className="text-gray-500 mt-1" style={{ fontFamily: "Livvic_400Regular" }}>
              {user?.distance} km away
            </Text>
            
            <View className="flex-row mt-2">
              {user?.interests?.slice(0, 2).map((interest, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-3 py-1 mr-2">
                  <Text className="text-gray-700 text-xs">{interest}</Text>
                </View>
              ))}
              {user?.interests?.length > 2 && (
                <View className="bg-gray-100 rounded-full px-3 py-1">
                  <Text className="text-gray-700 text-xs">+{user?.interests.length - 2}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          className="bg-[#473BF0] rounded-xl py-3 items-center"
          onPress={() => {
            onClose()
            onViewProfile(user)
          }}
        >
          <Text className="text-white font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)

// Filter Modal Component
const FilterModal = ({ visible, onClose, filters, setFilters }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View className="flex-1 justify-end">
      <TouchableOpacity 
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"
        onPress={onClose}
        activeOpacity={1}
      />
      
      <View className="bg-white rounded-t-3xl p-6" style={{ maxHeight: '80%' }}>
        <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
        
        <Text className="text-xl font-bold text-gray-800 mb-6" style={{ fontFamily: "Livvic_700Bold" }}>
          Filters
        </Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Age Range */}
          <View className="mb-6">
            <Text className="text-gray-800 font-semibold mb-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Age Range
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                {filters.ageRange[0]} - {filters.ageRange[1]} years
              </Text>
            </View>
            {/* Age slider would go here */}
          </View>
          
          {/* Distance */}
          <View className="mb-6">
            <Text className="text-gray-800 font-semibold mb-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Distance
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
                Within {filters.distance} km
              </Text>
            </View>
            {/* Distance slider would go here */}
          </View>
          
          {/* Interests */}
          <View className="mb-6">
            <Text className="text-gray-800 font-semibold mb-3" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Interests
            </Text>
            <View className="flex-row flex-wrap">
              {["Travel", "Music", "Sports", "Art", "Food", "Photography", "Reading", "Gaming"].map((interest, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`rounded-full px-4 py-2 mr-2 mb-2 ${
                    filters.interests.includes(interest) ? "bg-[#473BF0]" : "bg-gray-100"
                  }`}
                  onPress={() => {
                    const newInterests = [...filters.interests]
                    if (newInterests.includes(interest)) {
                      const index = newInterests.indexOf(interest)
                      newInterests.splice(index, 1)
                    } else {
                      newInterests.push(interest)
                    }
                    setFilters({...filters, interests: newInterests})
                  }}
                >
                  <Text 
                    className={filters.interests.includes(interest) ? "text-white" : "text-gray-700"}
                    style={{ fontFamily: "Livvic_400Regular" }}
                  >
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Online Status */}
          <View className="mb-6 flex-row justify-between items-center">
            <Text className="text-gray-800 font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Online Now
            </Text>
            <TouchableOpacity
              className={`w-12 h-6 rounded-full ${filters.onlineOnly ? "bg-[#473BF0]" : "bg-gray-300"} flex-row items-center px-1`}
              onPress={() => setFilters({...filters, onlineOnly: !filters.onlineOnly})}
            >
              <View className={`w-4 h-4 rounded-full bg-white ${filters.onlineOnly ? "ml-auto" : ""}`} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View className="flex-row mt-6">
          <TouchableOpacity 
            className="flex-1 bg-gray-100 rounded-xl py-3 items-center mr-3"
            onPress={() => {
              setFilters({
                ageRange: [18, 35],
                distance: 10,
                interests: [],
                onlineOnly: false
              })
            }}
          >
            <Text className="text-gray-700 font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Reset
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-[#473BF0] rounded-xl py-3 items-center"
            onPress={onClose}
          >
            <Text className="text-white font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)

export default function Find({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  })
  
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserPreview, setShowUserPreview] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    ageRange: [18, 35],
    distance: 10,
    interests: [],
    onlineOnly: false
  })
  
  // Sample nearby users data
  const nearbyUsers = [
    { 
      id: 1, 
      name: "Emma", 
      age: 27, 
      avatar: require("../../assets/users/1.png"),
      latitude: 37.78925, 
      longitude: -122.4344,
      distance: 0.8,
      interests: ["Photography", "Hiking", "Travel"],
      online: true
    },
    { 
      id: 2, 
      name: "James", 
      age: 31, 
      avatar: require("../../assets/users/2.png"),
      latitude: 37.78725, 
      longitude: -122.4304,
      distance: 1.2,
      interests: ["Music", "Coding", "Coffee"],
      online: true
    },
    { 
      id: 3, 
      name: "Sarah", 
      age: 26, 
      avatar: require("../../assets/users/3.png"),
      latitude: 37.78625, 
      longitude: -122.4354,
      distance: 1.5,
      interests: ["Yoga", "Reading", "Art"],
      online: false
    },
    { 
      id: 4, 
      name: "Michael", 
      age: 32, 
      avatar: require("../../assets/users/4.png"),
      latitude: 37.79025, 
      longitude: -122.4364,
      distance: 1.9,
      interests: ["Sports", "Cooking", "Movies"],
      online: false
    },
  ]

  const handleUserPress = (user) => {
    setSelectedUser(user)
    setShowUserPreview(true)
  }

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""}`}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#473BF0" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Livvic_700Bold" }}>
          Find People
        </Text>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Feather name="sliders" size={24} color="#473BF0" />
        </TouchableOpacity>
      </View>
      
      {/* Map */}
      <View className="flex-1">
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={currentLocation}
          showsUserLocation
          showsMyLocationButton
        >
          {/* 2km radius circle around user */}
          <Circle
            center={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            radius={2000} // 2km in meters
            strokeWidth={1}
            strokeColor="#473BF080"
            fillColor="#473BF020"
          />
          
          {/* User markers */}
          {nearbyUsers.map((user) => (
            <UserMarker
              key={user.id}
              user={user}
              onPress={handleUserPress}
            />
          ))}
        </MapView>
        
        {/* Current location button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-6 bg-white rounded-full p-3 shadow-md"
          onPress={() => {
            // Would normally use geolocation to get current position
          }}
        >
          <Ionicons name="locate" size={24} color="#473BF0" />
        </TouchableOpacity>
      </View>
      
      {/* User Preview Modal */}
      <UserPreviewModal
        user={selectedUser}
        visible={showUserPreview}
        onClose={() => setShowUserPreview(false)}
        onViewProfile={(user) => navigation.navigate("ProfileDetails", { userId: user.id })}
      />
      
      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </SafeAreaView>
  )
}