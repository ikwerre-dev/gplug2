"use client"

import { useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native"
import { Feather, FontAwesome, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

// Category Card Component
const CategoryCard = ({ title, icon, bgColor }) => (
  <TouchableOpacity className={`${bgColor} rounded-2xl p-4 mr-4 w-[160px] h-[100px] justify-between`}>
    <View className="bg-white/20 rounded-full p-3 w-12 h-12 flex items-center justify-center">{icon}</View>
    <Text className="text-white font-medium text-base" style={{ fontFamily: "Livvic_600SemiBold" }}>
      {title}
    </Text>
  </TouchableOpacity>
)

// Filter Button Component
const FilterButton = ({ icon, label, active }) => (
  <TouchableOpacity
    className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${active ? "bg-[#473BF0]" : "bg-gray-100"}`}
  >
    {icon}
    <Text className={`ml-2 ${active ? "text-white" : "text-gray-600"}`} style={{ fontFamily: "Livvic_500Medium" }}>
      {label}
    </Text>
  </TouchableOpacity>
)

// Profile Card Component - Modified to be touchable without opacity and with thicker bio text
const ProfileCard = ({ name, age, distance, image, bio, interests, onPress }) => (
  <TouchableOpacity 
    className="bg-white rounded-xl mb-4 overflow-hidden border border-gray-100" 
    onPress={onPress}
    activeOpacity={1} // This makes it touchable without changing opacity
  >
    <Image source={image} className="w-full h-[200px]" resizeMode="cover" />

    <View className="p-4">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Text className="text-xl font-bold text-gray-800 mr-2" style={{ fontFamily: "Livvic_700Bold" }}>
            {name}, {age}
          </Text>
          {distance < 5 && (
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-600 text-xs">Online</Text>
            </View>
          )}
        </View>
        <Text className="text-gray-500" style={{ fontFamily: "Livvic_400Regular" }}>
          {distance} km away
        </Text>
      </View>

      <Text className="text-gray-600 mb-3 font-medium" style={{ fontFamily: "Livvic_500Medium" }}>
        {bio}
      </Text>

      {interests && (
        <View className="flex-row flex-wrap mb-3">
          {interests.map((interest, index) => (
            <View key={index} className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-gray-700 text-xs">{interest}</Text>
            </View>
          ))}
        </View>
      )}

      <View className="flex-row">
        <TouchableOpacity className="bg-gray-100 rounded-full p-2 mr-3">
          <Feather name="x" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#473BF0] rounded-full p-2 mr-3">
          <FontAwesome name="heart" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 rounded-full p-2">
          <Feather name="message-circle" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
)

export default function Home({ navigation }) {
  const [showMap, setShowMap] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  // Sample nearby users data
  const nearbyUsers = [
    { id: 1, name: "Sarah", age: 28, latitude: 37.78925, longitude: -122.4344 },
    { id: 2, name: "Michael", age: 32, latitude: 37.78725, longitude: -122.4304 },
    { id: 3, name: "Jessica", age: 26, latitude: 37.78625, longitude: -122.4354 },
  ]

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === "android" ? "pt-[2rem]" : ""} pb-24`}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4 bg-white">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-xl text-gray-700" style={{ fontFamily: "Livvic_400Regular" }}>
                Hi,
              </Text>
              <Text style={{ fontFamily: "Livvic_700Bold" }} className="text-2xl font-bold text-[#473BF0]">
                Robinson
              </Text>
            </View>

            {/* Replaced Message and Profile buttons with notification icon */}
            <View className="flex-row">
              <TouchableOpacity
                className="bg-[#473BF0] rounded-full p-3"
                onPress={() => navigation.navigate("Notifications")}
              >
                <Ionicons name="notifications" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center border border-[#00000050] rounded-xl px-5 py-4">
            <Feather name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search by name, interests, location"
              placeholderTextColor="#6B7280"
              className="ml-2 text-base flex-1"
              style={{ fontFamily: "Livvic_400Regular" }}
            />
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 mb-6">
          <Text className="text-xl text-gray-700 font-semibold mb-4" style={{ fontFamily: "Livvic_600SemiBold" }}>
            Categories
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ml-[-6px]">
            <CategoryCard
              title="NEW MATCHES"
              icon={<FontAwesome name="heart" size={22} color="white" />}
              bgColor="bg-[#473BF0]"
            />
            <CategoryCard
              title="NEARBY"
              icon={<Ionicons name="location" size={22} color="white" />}
              bgColor="bg-[#4B91FF]"
            />
            <CategoryCard
              title="POPULAR"
              icon={<FontAwesome name="fire" size={22} color="white" />}
              bgColor="bg-gray-800"
            />
            <CategoryCard
              title="FAVORITES"
              icon={<Ionicons name="star" size={22} color="white" />}
              bgColor="bg-[#FF8C00]"
            />
          </ScrollView>
        </View>

        {/* Discover with People Nearby integrated */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl text-gray-700 font-semibold" style={{ fontFamily: "Livvic_600SemiBold" }}>
              Discover
            </Text>
            
            {/* Map Toggle moved to Discover section */}
            <View className="flex-row items-center">
              <Text className="mr-2 font-medium text-gray-600" style={{ fontFamily: "Livvic_600SemiBold" }}>
                Map View
              </Text>
              <Switch
                value={showMap}
                onValueChange={setShowMap}
                trackColor={{ false: "#E5E7EB", true: "#473BF0" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <FilterButton icon={<Ionicons name="location" size={20} color="white" />} label="Nearby" active={true} />
            <FilterButton
              icon={<MaterialIcons name="interests" size={20} color="#6B7280" />}
              label="Interests"
              active={false}
            />
            <FilterButton icon={<Entypo name="new" size={20} color="#6B7280" />} label="New" active={false} />
            <FilterButton icon={<FontAwesome name="fire" size={20} color="#6B7280" />} label="Popular" active={false} />
          </ScrollView>

          {/* People Nearby Map - Only show when map view is toggled on */}
          {showMap && (
            <View className="h-[250px] rounded-xl overflow-hidden mb-6 border border-gray-200">
              <View className="relative h-full">
                <MapView style={{ width: "100%", height: "100%" }} initialRegion={currentLocation}>
                  {/* Current user marker */}
                  <Marker
                    coordinate={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    }}
                    title="You"
                    pinColor="#473BF0"
                  />

                  {/* Nearby users markers */}
                  {nearbyUsers.map((user) => (
                    <Marker
                      key={user.id}
                      coordinate={{
                        latitude: user.latitude,
                        longitude: user.longitude,
                      }}
                      title={`${user.name}, ${user.age}`}
                      pinColor="#4B91FF"
                    />
                  ))}
                </MapView>

                {/* Fullscreen map button */}
                <TouchableOpacity
                  className="absolute bottom-4 right-4 bg-white rounded-full p-3 border border-gray-200"
                  onPress={() => navigation.navigate("Find")}
                >
                  <Feather name="maximize-2" size={20} color="#473BF0" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Profile Cards - Only show when map view is toggled off */}
          {!showMap && (
            <>
              <ProfileCard
                name="Emma"
                age="27"
                distance={2.3}
                image={require("../../assets/users/1.png")}
                bio="Love hiking, photography, and trying new restaurants. Looking for someone to share adventures with!"
                interests={["Photography", "Hiking", "Foodie", "Travel"]}
                onPress={() => navigation.navigate("ProfileDetails", { userId: 1 })}
              />

              <ProfileCard
                name="James"
                age="31"
                distance={4.7}
                image={require("../../assets/users/2.png")}
                bio="Software engineer by day, musician by night. Coffee enthusiast and dog lover."
                interests={["Music", "Coding", "Coffee", "Dogs"]}
                onPress={() => navigation.navigate("ProfileDetails", { userId: 2 })}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}